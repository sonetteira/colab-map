import 'ol/ol.css';
import {fromLonLat} from 'ol/proj';
import {Map, View} from 'ol';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature.js';
import {Point} from 'ol/geom.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {TileJSON, Vector as VectorSource} from 'ol/source.js';
import Stamen from 'ol/source/Stamen.js';

var pace = fromLonLat([-73.80823,41.12731]);
var pointFeature = new Feature(new Point(pace));
const map = new Map({
  target: 'map',  //this prints the map in the div with id map
  layers: [
    new TileLayer({
      source: new Stamen({layer: 'terrain'})
    }),
	
	new VectorLayer({
        source: new VectorSource({
          features: [pointFeature]
        })
	})
  ],
  view: new View({
    center: pace,
    zoom: 10
  })
});