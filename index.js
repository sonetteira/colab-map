import 'ol/ol.css';
import {fromLonLat} from 'ol/proj';
import {Map, View} from 'ol';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature.js';
import {Point} from 'ol/geom.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {TileJSON, Vector as VectorSource} from 'ol/source.js';
import Stamen from 'ol/source/Stamen.js';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';
import Overlay from 'ol/Overlay.js';

var deploymentLocs = [
	{
		'gps': [-73.80823,41.12731],
		'dep': 2,
		'name': 'Ada',
		'desc': 'Ada is the first sensor platform deployed in choate pond at Pace University'
	},
	{
		'gps': [-73.723518,41.736051],
		'dep': 4,
		'name': 'leanne',
		'desc': 'leanne lives here'
	},
	{
		'gps': [-73.696475,41.611607],
		'dep': 5,
		'name': 'jewel',
		'desc': 'jewel lives here'
	},
	{
		'gps': [-73.865845,41.140244],
		'dep': 6,
		'name': 'Kerneys cove',
		'desc': 'Kerneys cove is a research location on the huson river near ossining ny'
	},
];

var pace = fromLonLat([-73.80823,41.12731]);
//var pointFeature = new Feature(new Point(pace));

var features = new Array();

for (var i = 0; i<deploymentLocs.length; i++) { //loop through deployments
	features[i] = new Feature({
		'geometry': new Point(fromLonLat(deploymentLocs[i].gps)), //grab gps location and tranlate it into meters from some spot off the coast of west africa
		'size': new Style({
			image: new CircleStyle({
				radius: 8,
				fill: new Fill({color: '#79AFF5'}),
				stroke: new Stroke({color: '#666666', width: 1})
			})
		}),
		'note': deploymentLocs[i].dep + ': ' + deploymentLocs[i].name + '<br><br>' + deploymentLocs[i].desc,
		'name': deploymentLocs[i].name,
		'id': deploymentLocs[i].dep
	});
}

/*var features = [new Feature({
	'geometry': new Point(pace),
	'size': new Style({
        image: new CircleStyle({
			radius: 10,
            fill: new Fill({color: '#666666'}),
            stroke: new Stroke({color: '#bada55', width: 1})
        })
	}),
})];*/

var vectorSource = new VectorSource({
	features: features,
	wrapX: false
});
var vector = new VectorLayer({
	source: vectorSource,
	style: function(feature) {
	return feature.get('size');
	}
});

var map = new Map({
  target: 'map',  //this prints the map in the div with id map
  layers: [
    new TileLayer({
      source: new Stamen({layer: 'terrain'})
    }),
	vector
  ],
  view: new View({
    center: pace,
    zoom: 9
  })
});

/*var featureListener = function ( event, name ) {
    console.log(name);
};*/

var infoWindow = new Overlay({
	element: document.getElementById('popup')
});
map.addOverlay(infoWindow);

map.on('pointermove', function(event) {
	var el = infoWindow.getElement();
	$(el).popover('destroy');
    map.forEachFeatureAtPixel(event.pixel, function(feature,layer) {
		var coordinate = event.coordinate;
		infoWindow.setPosition(coordinate);
		$(el).popover({
			placement: 'top',
			animation: false,
			html: true,
			content: feature.values_.name
		});
		$(el).popover('show');
		//featureListener(event, feature.values_.note); //pass is the name of the point
        
    });
});

map.on('click', function(event) {
	map.getView().setZoom(map.getView().getZoom()+1);
	map.getView().setCenter(event.coordinate);
    var el = infoWindow.getElement();
	$(el).popover('destroy');
    map.forEachFeatureAtPixel(event.pixel, function(feature,layer) {
		var coordinate = event.coordinate;
		infoWindow.setPosition(coordinate);
		$(el).popover({
			placement: 'top',
			animation: false,
			html: true,
			content: feature.values_.note
		});
		$(el).popover('show');
		//featureListener(event, feature.values_.note); //pass is the name of the point
        
    });
});