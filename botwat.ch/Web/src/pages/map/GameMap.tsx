import React, {useEffect} from "react";
import {Map, TileLayer} from "react-leaflet";
import HeatmapLayer from "react-leaflet-heatmap-layer";
import {LatLngExpression, LatLngTuple} from "leaflet";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Grid, Typography} from "@material-ui/core";
import Position, {IPosition} from "./Position";
import {authenticationService} from "../../services/authentication.service";
import {accountService} from "../../services/account.service";
import moment from "moment";
import {IDashboard} from "../../data/dto/IDashboard";

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

interface HeatMap {
    heatMap: IPosition[]
}

export default function GameMap() {
    const [position, setPosition] = React.useState<LatLngTuple>([-79, -134]);
    const [zoom, setZoom] = React.useState<number>(8);
    const [coords, setCoords] = React.useState<string>("");

    let gameMap = React.useRef<Map>(null);

    const handleClick = (e) => {
        let val: Position = Position.fromLatLng(gameMap.current, e.latlng);
        setCoords(`coords(${val.x},${val.y})`);
    };

    const extractLat = (pos: IPosition) => Position.toLatLng(gameMap.current, pos.x, pos.y).lat;
    const extractLng = (pos: IPosition) => Position.toLatLng(gameMap.current, pos.x, pos.y).lng;
    const extractIntensity = (pos: IPosition) => pos.z;

    const [heatMap, setHeatMap] = React.useState<IPosition[]>([]);

    useEffect(() => {
        (async function fun() {
            let user = authenticationService.currentUserValue;
            if (user != null) {
                if (user.token != null) {
                    if (await authenticationService.login(user.name, user.token) != null) {
                        let localData: any = await accountService.getMap(moment().subtract(7, 'days').toDate(), 7);
                        if (typeof localData !== "string") {
                            let data = localData as HeatMap;
                            setHeatMap(data.heatMap);
                        }
                    }
                }
            }
        })()
    }, []);
    const gradient = {
        0.1: '#0c14e0', 0.2: '#4a86e6', 0.3: '#3dce46',
        0.4: '#faeb4d', 0.6: '#f56a29', 0.8: '#de3737'
    };
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
                         minZoom={5}
                         maxZoom={11}
                    >
                        <HeatmapLayer
                            fitBoundsOnLoad
                            points={heatMap}
                            gradient={gradient}
                            max={1.0}
                            radius={10}
                            longitudeExtractor={pos => extractLng(pos)}
                            latitudeExtractor={pos => extractLat(pos)}
                            intensityExtractor={pos => extractIntensity(pos)}
                        />
                        <TileLayer tms noWrap
                                   url="https://raw.githubusercontent.com/botwatch/osrs_map_full_2020_03_07/master/0/{z}/{x}/{y}.png"/>
                    </Map>
                </Grid>
            </Grid>
            <Typography>{coords}</Typography>
        </div>
    );
}