import Leaflet, {LatLngExpression, LatLngTuple} from "leaflet";
import {LatLng, Map} from "react-leaflet";

export const MAP_HEIGHT_PX = 296704; // Total height of the map in px at max zoom level
export const RS_TILE_WIDTH_PX = 32, RS_TILE_HEIGHT_PX = 32; // Width and height in px of an rs tile at max zoom level
export const RS_OFFSET_X = 1152; // Amount to offset x coordinate to get correct value
export const RS_OFFSET_Y = 8328; // Amount to offset y coordinate to get correct value

export interface IPosition {
    x: number,
    y: number,
    z: number
}

export default class Position implements IPosition {
    public x: number;
    public y: number;
    public z: number;

    constructor(x, y, z) {
        this.x = Math.round(x);
        this.y = Math.round(y);
        this.z = z;
    }

    static fromLatLng(map: Map | null, latLng: LatLngExpression, z: number = -999): Position {
        if (map == null) return new Position(0, 0, 0);
        if (z == -999) z = map.leafletElement.getZoom();

        let point = map.leafletElement.project(latLng, map.leafletElement.getMaxZoom());
        let y = MAP_HEIGHT_PX - point.y + (RS_TILE_HEIGHT_PX / 4);
        y = Math.round((y - RS_TILE_HEIGHT_PX) / RS_TILE_HEIGHT_PX) + RS_OFFSET_Y;
        let x = Math.round((point.x - RS_TILE_WIDTH_PX) / RS_TILE_WIDTH_PX) + RS_OFFSET_X;
        return new Position(x, y, z);
    }

    static toLatLng(map: Map | null, x: number, y: number): Leaflet.LatLng {
        if (map == null || map.leafletElement == null) return new Leaflet.LatLng(0, 0);

        x = ((x - RS_OFFSET_X) * RS_TILE_WIDTH_PX) + (RS_TILE_WIDTH_PX / 4);
        y = (MAP_HEIGHT_PX - ((y - RS_OFFSET_Y) * RS_TILE_HEIGHT_PX));
        let projection = map.leafletElement.unproject(Leaflet.point(x, y), map.leafletElement.getMaxZoom());
        return new Leaflet.LatLng(projection.lat, projection.lng);
    }

    toLatLng(map) {
        return Position.toLatLng(map, this.x, this.y)
    }

    toCentreLatLng(map) {
        return Position.toLatLng(map, this.x + 0.5, this.y + 0.5)
    }

    getDistance(position) {
        var diffX = Math.abs(this.x - position.x);
        var diffY = Math.abs(this.y - position.y);
        return Math.sqrt((diffX * diffX) + (diffY * diffY));
    }

    toLeaflet(map) {
        var startLatLng = this.toLatLng(map);
        var endLatLng = new Position(this.x + 1, this.y + 1, this.z).toLatLng(map);

        return Leaflet.rectangle(Leaflet.latLngBounds(startLatLng, endLatLng), {
            color: "#33b5e5",
            fillColor: "#33b5e5",
            fillOpacity: 1.0,
            weight: 1,
            interactive: false
        });
    }

    equals(position) {
        return this.x === position.x && this.y === position.y && this.z === position.z;
    }

    toString() {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }
};