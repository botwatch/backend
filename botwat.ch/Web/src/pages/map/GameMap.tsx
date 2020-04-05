import React from "react";
import {CircleMarker, ImageOverlay, LatLng, Map, Marker, Point, Popup, TileLayer} from "react-leaflet";
import {CRS, LatLngTuple} from "leaflet";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Grid, Typography} from "@material-ui/core";
import mapImage from '../../resources/osrs_world_map.png';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(3)
        },
        mapId: {
            width: '85vw',
            height: '85vh'
        }
    }));

export default function GameMap() {
    const [position, setPosition] = React.useState<LatLngTuple>([2500, 5500]);
    const [zoom, setZoom] = React.useState<number>(-1);
    const [coords, setCoords] = React.useState<string>("");

    const gameMap = React.createRef<Map>();

    const handleClick = (e) => {
        const {lat, lng} = e.latlng;
        let val = pixelToCoord(lat, lng);
        let ex = coordToPixel(val[0], val[1]);
        setCoords(` coords(${val[0]},${val[1]}) lat ${lat} - ${ex[0]} lng ${lng} - ${ex[1]}`);
    };

    const pixelToCoord = (lat: number, lng: number) => {
        let xPixel = lng / 3.012;
        let yPixel = (4850 - lat) / 3.026;

        let xOffset = 1152;
        let yOffset = 4096;

        return [Math.round(xPixel + xOffset), Math.round(yOffset - yPixel)];
    };

    const coordToPixel = (x: number, y: number) => {
        let xOffset = 1152;
        let yOffset = 4096;

        let xPixel = (y - xOffset) * 3.0125 - 4018;
        let yPixel = ((x + yOffset) * 3.026) - 15880;

        return [Math.round(xPixel), Math.round(yPixel)];
    };
    
    const [marker, setMarker] = React.useState<LatLngTuple>(coordToPixel(3245, 3225) as LatLngTuple);
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={4}
            >
                <Grid
                    item
                    lg={8}
                    md={12}
                    xl={9}
                    xs={12}
                >
                    <Map ref={gameMap}
                         onmousemove={handleClick}
                         center={position}
                         zoom={zoom}
                         className={classes.mapId}
                         crs={CRS.Simple}
                         minZoom={-2}
                         maxZoom={4}
                    >
                        <ImageOverlay url={mapImage} bounds={[[0, 0], [4850, 8306]]}/>
                        <CircleMarker center={marker} radius={20}/>
                    </Map>
                </Grid>
            </Grid>
            <Typography>{coords}</Typography>
        </div>
    );
}