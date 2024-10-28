import React, {useEffect, useRef, useState} from "react";
import './test.css';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from "axios";
import * as ReactBootStrap from 'react-bootstrap';
import paginationFactory, { PaginationProvider, PaginationTotalStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import Multiselect from 'multiselect-react-dropdown';
import { MapContainer} from 'react-leaflet';
import {Button,Modal} from "react-bootstrap";
import JSONPretty from 'react-json-pretty';
import { MdOutlinePageview } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import * as L from 'leaflet';
import 'leaflet-draw';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import 'leaflet-draw/dist/leaflet.draw.css'; // Import Leaflet Draw CSS
import AuthService from "../services/auth.service";
import {mayFlyer, addEEZ} from './helper';
import 'leaflet-providers';
import "leaflet-bing-layer";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const Home = () => {

  //VARIABLES
  const markersLayer = useRef(null);
  const mapContainermain = useRef(null);
  const baseLayermain = useRef();
  var JSONPrettyMon = require('react-json-pretty/dist/monikai');
  const [unauthorized, setUnauthorized] = useState(false);
  const [infoshow, setinfoshow] = useState(false);
  const [infotext, setinfotext] = useState(false);
  const [table, setTable] = useState({tags:[], flags:[], topics:[], parameters:[]});
  const [metadata, setMetadata] = useState('');
  const [infoshow2, setinfoshow2] = useState(false);
  const [infoshow22, setinfoshow22] = useState(false);
  const [message, setMessage] = useState('');
  const [css, setCss] = useState('btn btn-warning');
  const [header, setHeader] = useState('Success');
  const [infotext2, setinfotext2] = useState(false);
  const infotext2Ref = useRef(false);
  const layer = useRef(null);
  const layer2 = useRef(null);
  const layer3 = useRef(null);
  const mapContainer = useRef(null);
  const baseLayer = useRef();
  const _isMounted = useRef(true);
  const [title, setTitle] = useState('');
  const [extent, setExtent] = useState('');
  const extentref = useRef('');
  const titleref = useRef('all');
  const countryref = useRef('all');
  const datatyperef = useRef('all');
  const projectref = useRef('all');
  const isMarkerRef = useRef();
  const positionRef = useRef([0.878032, 185.843298]);
  const zoomRef = useRef(3);
  const markerRef = useRef([51.505, -0.09])
  const bboxRef = useRef([[-20.3034175184893,181.97255105015114],[-15.241789855961722,175.9708637472084]]);
  const countryFlagRef = useRef(require('../flags/FJI.png'))
  const [loading, setLoading] =useState(true);
  const [obsSource, setobsSource] =useState([]);
  const [parameter, setParameter]  = useState([{key:'all',label:"%"}]);
  const [parameterlist,setParameterlist] = useState([]);
  const [country, setCountry]  = useState();
  const [countrylist,setCountrylist] = useState([]);
  const [datatype, setDatatype]  = useState();
  const [datatypelist,setDatatypelist] = useState([]);
  const [project, setProject]  = useState('');
  const [projectlist,setProjectlist] = useState([]);
  const [openlist,setOpenlist] = useState([]);
  const openRef = useRef('all')
  const [tag, setTag]  = useState([{key:'all',label:"all"}]);
  const [taglist,setTaglist] = useState([]);
  const [topic, setTopic]  = useState([{key:'all',label:"all"}]);
  const [topiclist,setTopiclist] = useState([]);
  const [checked, setChecked] = React.useState(false);
  const [token, setToken] = React.useState(null);

  const handleinfo = () => {
    setinfoshow(false)
  };
  const handleinfo2 = () => {
    setinfoshow2(false)
  };
  const handleinfo22 = () => {
    setinfoshow22(false)
  };


  const getPlayerData = async (e) => {
      try{
        if (markersLayer.current != null){
        markersLayer.current =  L.featureGroup().addTo(mapContainermain.current).on("click", groupClick);
        }
        layer2.current = null;
        mapContainermain.current.eachLayer(function (layer) {
          const layername = layer.options.id;
          if(layername === 8){
            mapContainermain.current.removeLayer(layer);
          }
          
        });
        if (checked){
       
        }
        else{
            //NEWWWW
            console.log(titleref.current, datatyperef.current, projectref.current, countryref.current, openRef.current, tag[0].key, topic[0].key)
          setLoading(false)
          setobsSource([])
          const params = {
              title:titleref.current,
              datatype_id:datatyperef.current,
              country:countryref.current,
              parameters:parameter[0].key,
              tag:tag[0].key,
              topic:topic[0].key,
              project:projectref.current
          
          }

        console.log('anujjj')
       var marker;
          //const data2 = await axios.get("https://dev-oceanportal.spc.int/dbms/api/dataset/?format=json");
          const data2 = await axios.get("https://dev-oceanportal.spc.int/dbms/api/dataset/?SpatialInfo="+countryref.current+"&Tag="+tag[0].key+"&Topic="+topic[0].key+"&dataType="+datatyperef.current+"&format=json&openAccess="+openRef.current+"&project="+projectref.current+"");
          let counter = 1;
          var polygon = [];
          for (var b=0; b<data2.data.length; b++){
              let temp = [];
              var country = "Tuvalu";
              
              var desc2 = data2.data[b].title;
              var title = data2.data[b].abstract;
              var datatype = data2.data[b].dataType.name;
              var project = data2.data[b].project.name;
              var is_restricted = data2.data[b].openAccess;
              var email = data2.data[b].contact.email;
              var version = data2.data[b].version;
              var dtatype = data2.data[b].dataType.id;
              var extents = data2.data[b].boundingBox;
              
              var coord_marker = [];
              var coordbbox = [];
              if (dtatype === 6){
                coord_marker.push(extents.westBoundLongitude)
                coord_marker.push(extents.southBoundLatitude)
              var test3 = data2.data[b].id;
              
              marker = L.marker(coord_marker,{icon:redIcon,id:8}).addTo(markersLayer.current).bindPopup("<div style='width: 150px;text-align: center;'>"+ desc2+"</div>",{
                maxWidth: "auto"
            })
              marker.test = test3;
              marker.type = datatype;
              //layer2.current = L.marker(coord_marker,{icon:redIcon,id:idxx}).on('click', function(e) {console.log(e)});
              //layer2.current.addTo(mapContainermain.current);
              }
              else{
                var tmp = []
                tmp.push(extents.southBoundLatitude)
                tmp.push(extents.westBoundLongitude)
                //coordbbox.push(tmp)
                tmp = [];
                tmp.push(extents.northBoundLatitude	)
                tmp.push(extents.eastBoundLongitude)
                //coordbbox.push(tmp)

                const coordbbox = [
                  [extents.southBoundLatitude, extents.westBoundLongitude],
                  [extents.northBoundLatitude, extents.eastBoundLongitude]
              ];
              
                var test2 = data2.data[b].id;
                marker = L.rectangle(coordbbox, {id:8,color: '#FF5733', weight: 3}).addTo(markersLayer.current).bindPopup("<div style='width: 150px; text-align: center;'>"+ desc2+"</div>",{
                  maxWidth: "auto"
              })
               marker.test = test2;
                marker.type = datatype;
              }
                
              

              temp.push({
                  "id":counter,
                  "idx":data2.data[b].id,
                  "desc":desc2,
                  "title":title,
                  "datatype":datatype,
                  "country":country.toString(),
                  "project":project,
                  "is_restricted":is_restricted,
                  "email":email,
                  "version":version
              })
              counter = counter + 1;
              polygon.push(temp)
              
              setobsSource(prevData =>[...prevData, ...temp]);
          }

        //  fitbbox(mapContainermain.current, mayFlyer(countryref.current))
          //console.log(polygon)

          setLoading(true)
        
      }
      }
      catch (e){
          console.log(e);
      }
  }
  const fetchparameters = () => {
    axios
      .get('https://opmdata.gem.spc.int/api/parameters')
      .then((response) => {
        const { data } = response;
        if(response.status === 200){
          var temp=[]
          for (var i =0; i <data.length; i++){
            temp.push({key:data[i].short_name, label:data[i].standard_name})
          }
            //check the api call is success by stats code 200,201 ...etc
            setParameterlist(temp)
        }else{
            //error handle section 
        }
      })
      .catch((error) => console.log(error));
  };
  const fetchtags = () => {
    axios
      .get('https://dev-oceanportal.spc.int/dbms/api/tag/?format=json')
      .then((response) => {
        const { data } = response;
        if(response.status === 200){
          var temp=[]
          for (var i =0; i <data.length; i++){
            temp.push({key:data[i].id, label:data[i].name})
          }
            //check the api call is success by stats code 200,201 ...etc
            setTaglist(temp)
        }else{
            //error handle section 
        }
      })
      .catch((error) => console.log(error));
  };
  const fetchdatatype = () => {
    axios
      .get('https://dev-oceanportal.spc.int/dbms/api/datatype/?format=json')
      .then((response) => {
        const { data } = response;
        if(response.status === 200){
            //check the api call is success by stats code 200,201 ...etc
            setDatatypelist(data)
        }else{
            //error handle section 
        }
      })
      .catch((error) => console.log(error));
  };
  const fetchcountry = () => {
    axios
      .get('https://dev-oceanportal.spc.int/dbms/api/spatialinfo/?format=json')
      .then((response) => {
        const { data } = response;
        if(response.status === 200){
            //check the api call is success by stats code 200,201 ...etc
            setCountrylist(data)
            
        }else{
            //error handle section 
        }
      })
      .catch((error) => console.log(error));
  };
  const fetchproject = () => {
    axios
      .get('https://dev-oceanportal.spc.int/dbms/api/project/?format=json')
      .then((response) => {
        const { data } = response;
        if(response.status === 200){
            //check the api call is success by stats code 200,201 ...etc
            setProjectlist(data)
        }else{
            //error handle section 
        }
      })
      .catch((error) => console.log(error));
  };
  const fetchtopic = () => {
    axios
      .get('https://dev-oceanportal.spc.int/dbms/api/topic/?format=json')
      .then((response) => {
        const { data } = response;
        if(response.status === 200){
          var temp=[]
          for (var i =0; i <data.length; i++){
            temp.push({key:data[i].id, label:data[i].name})
          }
            //check the api call is success by stats code 200,201 ...etc
            setTopiclist(temp)
        }else{
            //error handle section 
        }
      })
      .catch((error) => console.log(error));
  };
  const columns = [
      {dataField: "id", text:"ID",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "desc", text:"Title",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "title", text:"Description",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "datatype", text:"Data Type",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "country", text:"Country",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "project", text:"Project",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "is_restricted", text:"Restricted",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "email", text:"Contact",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "version", text:"Version",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "edit", text:"Action",formatter: rankFormatter,style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}}
  ]

  function addMarker(map, markercoord, id) {
  
    const redIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    var layer = L.marker(markercoord,{icon:redIcon,id:id}).addTo(map);//.openPopup();
    map.flyTo(markercoord, 12);
    return layer;
  
  
  }

  const redIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  function fitbbox(map, bbox){
    map.fitBounds(bbox);
    return map;
  }

  function addBBox(map, bbox) {
   
    var rect = L.rectangle(bbox, {color: '#FF5733', weight: 3}).addTo(map);
    map.fitBounds(bbox);
    return rect;
  
  
  }
  
  const getOneData = async (row) => {
  //  console.log('anuj',row)
    setLoading(false)
    
    const data2 = await axios.get("https://dev-oceanportal.spc.int/dbms/api/dataset/"+row+"/?format=json");
    
    countryFlagRef.current =  require('../flags/TUV.png')
    console.log(data2.data)
    var extents = data2.data.boundingBox;
    
    var dtatype = data2.data.dataType.id;
    
    if (dtatype === 6){
      isMarkerRef.current = true;
    }
    else{
      isMarkerRef.current = false
    }
    var coord_marker = [];
    var coordbbox = [];
    if (isMarkerRef.current){
      
    }
    else{

      const coordbbox = [
                  [extents.southBoundLatitude, extents.westBoundLongitude],
                  [extents.northBoundLatitude, extents.eastBoundLongitude]
              ];
              
    //  coordbbox.push(tmp)
      //console.log(coordbbox)
      bboxRef.current = coordbbox;
      //positionRef.current = tmp;
      zoomRef.current = 4;
      //const map = mapRef.current;
   // console.log('map state', map);
    //console.log("map ref", mapRef);
    
    
      //map.flyTo([-8.541147, 179.196198], 12);
    }
      
    const jsonData = JSON.stringify(data2.data, null, 2);
    var parameters = [];
    var extentsarr = [];
    var flags = [];
    var tags = [];
    var topics = [];
    var sourceurl = [];

    var metadata = {};
    metadata.title = data2.data.title;
    metadata.description = data2.data.abstract;
    metadata.temporal_coverage_from = data2.data.temporalCoverageFrom	;
    metadata.temporal_coverage_to = data2.data.temportalCoverageTo	;
    metadata.language = data2.data.language;
    metadata.version = data2.data.version;
    metadata.is_restricted = String(data2.data.openAccess);
    metadata.data_type = data2.data.dataType.name;
    metadata.country = "Tuvalu";
    metadata.spatial_projection = data2.data.GeoReferenceSystem;
    metadata.project = data2.data.project.name;
    metadata.organization = data2.data.publisher;
    metadata.contact = data2.data.contact.email;
    metadata.license = data2.data.license;
    

    for (var i =0; i<data2.data.Topic.length; i++){
      topics.push(data2.data.Topic[i].name)
    }
    metadata.topics = topics;

    for (var j =0; j<data2.data.Tag.length; j++){
      tags.push(data2.data.Tag[j].name)
    }
    metadata.tags = tags;
    var src_url =  data2.data.LocalAccessPath;
    if(data2.data.LocalAccessPath === null){
      src_url = data2.data.file;
    }
    metadata.extents = "westBoundLongitude="+data2.data.boundingBox.westBoundLongitude;
    metadata.sourceurl = src_url;
    metadata.updated_at = data2.data.updated_at;
    metadata.created_at = data2.data.created_at;


    setTable(metadata)
    setinfotext(jsonData)
    setLoading(true)
    setinfoshow(true)
    setTimeout(function() {
      
    initMap(isMarkerRef.current, markerRef.current, bboxRef.current);
    }, 300);
    
  }

  function rankFormatter(cell, row, rowIndex, formatExtraData) { 
      //console.log(cell)
      return ( 
            < div 
                style={{ textAlign: "center",
                   cursor: "pointer",
                  lineHeight: "normal" }}>
                      
              <MdOutlinePageview  style={{width:"23px",height:"23px"}} onClick={() => {getOneData(row.idx)}}/> 
       </div> 
  ); } 

  const handleTitle = event => {
    titleref.current = event.target.value;
    setTitle(event.target.value);
  };
  
  const handlemetatext = event => {
    setMetadata(event.target.value);
  };
  


const options = {
  custom: true,
  totalSize: obsSource.length
};

function initialize_map(){
    
  baseLayermain.current = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; Pacific Community (OSM)',
      detectRetina: true
  });
  //console.log('Home Rendered!!');
  mapContainermain.current = null;
  mapContainermain.current = L.map('mapidmain', {
      zoom: 3,
      center: [0.878032, 185.843298]
    });
    
    baseLayermain.current.addTo(mapContainermain.current); 

    var m_drawn_features = new L.FeatureGroup();
    mapContainermain.current.addLayer(m_drawn_features);

   let draw_control = new L.Control.Draw({
    position: 'topleft',
    draw: {
        polyline: false,
        polygon: false,
        circle: false,
        rectangle: true,
        circlemarker: false,
        marker: false,
    },
    edit: {
      featureGroup: m_drawn_features, //REQUIRED!!
      remove: true
  }
});

mapContainermain.current.addControl(draw_control);
layer3.current = addEEZ(mapContainermain.current)
mapContainermain.current.on(L.Draw.Event.CREATED, function(e) {
  // Remove all layers (only show one location at a time)
  m_drawn_features.clearLayers();

  // Add layer with the new features
  let new_features_layer = e.layer;
  m_drawn_features.addLayer(new_features_layer);


 // let new_features_layer = e.layer;
    var extent_def = new_features_layer._bounds._northEast.lat+","+new_features_layer._bounds._southWest.lat+","+new_features_layer._bounds._northEast.lng+","+new_features_layer._bounds._southWest.lng;
    var minx = new_features_layer._bounds._southWest.lng;
    var maxx = new_features_layer._bounds._northEast.lng;
    var miny = new_features_layer._bounds._southWest.lat;
    var maxy = new_features_layer._bounds._northEast.lat;
  setExtent(extent_def);
  extentref.current = "minx="+minx+" maxx="+maxx+" miny="+miny+" maxy="+maxy;
  

});
markersLayer.current = L.featureGroup().addTo(mapContainermain.current).on("click", groupClick);
fitbbox(mapContainermain.current, mayFlyer('TUV'))
  }
  function findDuplicateArrayIndices(arrays) {
    const indexMap = new Map();

    arrays.forEach((array, index) => {
        const key = JSON.stringify(array);
        if (!indexMap.has(key)) {
            indexMap.set(key, []);
        }
        indexMap.get(key).push(index);
    });

    const duplicateIndices = [];
    indexMap.forEach((indices) => {
        if (indices.length > 1) {
            duplicateIndices.push(indices);
        }
    });

    return duplicateIndices;
}

function* flattenArray(arr) {
  for (let item of arr) {
      if (Array.isArray(item)) {
          yield* flattenArray(item);
      } else {
          yield item;
      }
  }
}


  function groupClick(event) {
   // console.log(markersLayer.current._layers['57']._bounds);
    //console.log(markersLayer.current._layers['60']._bounds);
    if (datatyperef.current !== 'insitu'){
    var obj = markersLayer.current._layers;
    var result = Object.keys(obj).map((key) => [key, obj[key]]);
    console.log(result);
    var all_bounds = [];
    var ids = [];
    for (var a=0; a<result.length; a++){
      var temp = [];
      var ind =[];
      ind.push(result[a][1].test)
      ind.push(a)
      ids.push(ind)
      temp.push(result[a][1]._bounds._southWest.lat)
      temp.push(result[a][1]._bounds._southWest.lng)
      temp.push(result[a][1]._bounds._northEast.lat)
      temp.push(result[a][1]._bounds._northEast.lng)
      all_bounds.push(temp)
    }
    var commons = findDuplicateArrayIndices(all_bounds); 
    const flatArray = Array.from(flattenArray(commons));
    console.log(flatArray);
    console.log(ids)
    var valid = false;
    for (var b=0; b<ids.length; b++){
      var org_ind = ids[b][1];
      var vool = false
      for (var c=0; c<flatArray.length; c++){
        if (org_ind === flatArray[c]){
          vool = true
        }
      }
      if(!vool){
        if (ids[b][0] === event.layer.test){
          valid = true
        }
      }
    }
    

    if (!valid){
      //setCss('btn btn-warning')
      //setHeader('Warning')
      //setMessage("Some layers maybe intersecting, please use the table below to view metadata.")
      //setinfoshow22(true)
      toast.warning('Use table to view metadata!', {position: toast.POSITION.BOTTOM_RIGHT, autoClose:4000, width:'400px', pauseOnHover:false, closeOnClick:true})
    }
    else{
      getOneData(event.layer.test)
    }
  }
  else{
    getOneData(event.layer.test)
  }
    
 //     console.log(xmin_bool, ymin_bool, xmax_bool, ymax_bool)
  //  console.log(json_obj)

    /*
    var first_layer = markersLayer.current._layers['57']._bounds;
    var second_layer = markersLayer.current._layers['60']._bounds;
    console.log(event.layer.type)
    if (event.layer.type !== 'insitu'){
    if (JSON.stringify(first_layer) === JSON.stringify(second_layer)){
      setCss('btn btn-warning')
            setHeader('Warning')
            setMessage("Some layers maybe overlapping, please use the table below to view metadata.")
            setinfoshow22(true)
    }
    else{
    getOneData(event.layer.test)
    }
  }
  else{
    getOneData(event.layer.test)
  }*/
  }

  function initMap(isMarker, markercoord, bbox){
    
    const BING_KEY = 'AnIOo4KUJfXXnHB2Sjk8T_zV-tI7FkXplU1efiiyTYrlogDKppodCvsY7-uhRe8P'
   
    baseLayer.current = L.tileLayer.bing(BING_KEY, {
      //  maxZoom: 5,
        attribution:
        '&copy; Pacific Community (OSM)',
        detectRetina: true,
      });
/*
      baseLayer.current = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; Pacific Community (OSM)',
          detectRetina: true
      });*/
      //console.log('Home Rendered!!');
      mapContainer.current = null;
        mapContainer.current = L.map('mapId', {
          zoom: 3,
          center: [0.878032, 185.843298]
        });
        
        baseLayer.current.addTo(mapContainer.current); 

        if (isMarker){
        layer.current = addMarker(mapContainer.current,markercoord,999);
        }
        else{
         // console.log(bbox)
          layer.current = addBBox(mapContainer.current, bbox)
        }

        //MAIN MAPPING
        
     // }

        /*
        var m_drawn_features = new L.FeatureGroup();
   mapContainer.current.addLayer(m_drawn_features);

   let draw_control = new L.Control.Draw({
    position: 'topleft',
    draw: {
        polyline: false,
        polygon: false,
        circle: false,
        rectangle: true,
        circlemarker: false,
        marker: false,
    },
    edit: {
      featureGroup: m_drawn_features, //REQUIRED!!
      remove: true
  }
});

mapContainer.current.addControl(draw_control);

mapContainer.current.on(L.Draw.Event.CREATED, function(e) {
  // Remove all layers (only show one location at a time)
  m_drawn_features.clearLayers();

  // Add layer with the new features
  let new_features_layer = e.layer;
  m_drawn_features.addLayer(new_features_layer);

 // setExtent(new_features_layer)
  console.log(new_features_layer._bounds)
  var extent_def = new_features_layer._bounds._northEast.lat+","+new_features_layer._bounds._southWest.lat+","+new_features_layer._bounds._northEast.lng+","+new_features_layer._bounds._southWest.lng;
  console.log(extent_def)
  setExtent(extent_def);
  extentref.current(extent_def)
  //  console.log('----------');
//   console.log('----------');
//  update_plot(new_features_layer);
});
*/
  }

  useEffect(() => {  

      if (_isMounted.current){
        initialize_map();
        const user = AuthService.getCurrentUserCookie();
        if (user === null || user === undefined){
          setUnauthorized(true);
        }
        else{
          setToken(user.accessToken)
          setUnauthorized(false);
        }
          
        fetchparameters();
        fetchtags();
        fetchtopic();
        fetchcountry();
        fetchdatatype();
        fetchproject();
      }  
      return () => { _isMounted.current = false }; 
      },[]);

    return (
        <div className="container-fluid">
            <main id="bodyWrapper" >
          <div id="mapWrapper" style={{marginLeft:'-9px',marginRight:'-9px'}}>

 <div className="row">
 <div className="col-sm-6" style={{backgroundColor:'#f7f7f7'}} id="map3">
 <div className="row" >
    <div className="col-sm-12">
    <div className="form-group form-select-sm" style={{textAlign:'left'}}>
    <label htmlFor="exampleInputEmail2" >Title</label>
    <input type="email" className="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" onChange={handleTitle} value={title}/>
    </div>
      </div>
      </div>
      <div className="row" style={{marginTop:'0px'}}>
      <div className="col-sm-6">
      <div className="form-group form-select-sm" style={{textAlign:'left'}}>
      <label htmlFor="exampleInputEmail1">Data Type</label> 
      <select  className="form-select form-select-sm"  id="exampleInputEmail2" aria-label=".form-select-sm example"
              value={datatype}
              onChange={(e) => {
                datatyperef.current = e.currentTarget.value;
                setDatatype(e.currentTarget.value)
                e.currentTarget.blur();}}
          >
             <option key="value" value="all">-- Select --</option>
              {datatypelist.map((item) => (
              <option key={item.id} value={item.id}>
                  {item.name}
              </option>
              ))}
          </select>
    </div>

  </div>
  <div className="col-sm-6">
  <div className="form-group form-select-sm" style={{textAlign:'left'}}>
      <label htmlFor="exampleInputEmail1">Project</label>
      <select  className="form-select form-select-sm"  id="exampleInputEmail2" aria-label=".form-select-sm example"
              disabled={false}
              value={project}
              onChange={(e) => {
                projectref.current = e.currentTarget.value;
                setProject(e.currentTarget.value)
                e.currentTarget.blur();}}
          >
            <option value="all">-- Select --</option>
              {projectlist.map((item) => (
              <option key={item.id} value={item.id}>
                  {item.name}
              </option>
              ))}
          </select>
    </div>

  </div>
      </div>
      <div className="row" style={{marginTop:'0px'}}>
    <div className="col-sm-6">
    <div className="form-group form-select-sm" style={{textAlign:'left'}}>
      <label htmlFor="exampleInputEmail1">Spatial Info</label>
      <select  className="form-select form-select-sm"  id="exampleInputEmail2" aria-label=".form-select-sm example"
              disabled={false}
              value={country}
              onChange={(e) => {
                countryref.current = e.currentTarget.value;
                //fitbbox(mapContainermain.current, mayFlyer(e.currentTarget.value))
                setCountry(e.currentTarget.value)
                e.currentTarget.blur();}}
                
                
          >
            <option value="all">-- Select --</option>
              {countrylist.map((item) => (
              <option key={item.id} value={item.id}>
                  {item.name}
              </option>
              ))}
          </select>
    </div>
      </div>
      <div className="col-sm-6">
    <div className="form-group form-select-sm" style={{textAlign:'left'}}>
      <label htmlFor="exampleInputEmail1">Open Access</label>
      <select  className="form-select form-select-sm"  id="exampleInputEmail2" aria-label=".form-select-sm example"
              disabled={false}
              value={openRef.current}
              onChange={(e) => {
              //  countryref.current = e.currentTarget.value;
                //fitbbox(mapContainermain.current, mayFlyer(e.currentTarget.value))
               // setOpenlist(e.currentTarget.value)
                openRef.current = e.currentTarget.value;
                e.currentTarget.blur();}}
                
                
          >
            <option value="all">-- Select --</option>
            <option key= "1" value="True">Open Access</option>
            <option key="2" value="False">Restricted Access</option>
          </select>
     
  
    </div>
      </div>
      </div>
      <div className="row" style={{marginTop:'0px'}}>
      <div className="col-sm-6">
      <div className="form-group form-select-sm" style={{textAlign:'left'}}>
      <label htmlFor="exampleInputEmail1">Tag</label> 
      <Multiselect
          displayValue="label"
          isObject={true}
          closeMenuOnSelect={false}
          onRemove={(event) => {
            setTag([{key:'%',label:"%"}]);
          }}
          onSelect={(event) => {
            setTag(event);
          }}
          options={taglist}
          selectedValues={[]}
          showCheckbox
          selectionLimit={1}
          avoidHighlightFirstOption
        />
    </div>

  </div>
  <div className="col-sm-6">
    <div className="form-group form-select-sm" style={{textAlign:'left'}}>
      <label htmlFor="exampleInputEmail1">Topic</label> 
      
      <Multiselect
          displayValue="label"
          isObject={true}
          onRemove={(event) => {
            setTopic([{key:'%',label:"%"}])
          }}
          onSelect={(event) => {
            setTopic(event);
          }}
          options={topiclist}
          selectedValues={[{key:1,label:"ocean"}]}
          showCheckbox
          selectionLimit={1}
          avoidHighlightFirstOption 
        />
  
    </div>
      </div>
      </div>
      
      <div className="row" style={{marginTop:'5px'}}>
      <div className="d-flex justify-content-between">
      <div>
         
      </div>
      <div>
         
      <button type="submit" className="btn btn-primary  btn-sm" onClick={getPlayerData}>Search</button>
      </div>
 </div>
 
        </div>
      <br/>
 </div>
 <div className="col-sm-6" id="map"  style={{paddingLeft:'0'}}>
 <div id="mapidmain" style={{ height: '100%', width: '100%' }}></div>

  </div>
 </div>

 <div className="row justify-content-center" style={{height:"50vh"}}>
    <div className="col-sm-12"  style={{padding:'2%', textAlign:'center'}}>
        {loading ? (
                <PaginationProvider
                pagination={ paginationFactory(options) }
                >
                {
                    ({
                    paginationProps,
                    paginationTableProps
                    }) => (
                    <div>
                        <PaginationTotalStandalone 
                        { ...paginationProps }
                        />
                        <PaginationListStandalone
                        { ...paginationProps }
                        />
                        <BootstrapTable
                        keyField="id"
                        data={ obsSource }
                        columns={ columns }
                        hover
                        { ...paginationTableProps }
                        />
                    </div>
                    )
                }
                </PaginationProvider>
        ):(
            <ReactBootStrap.Spinner animation="border" variant="primary"/>
        )}
        </div>
        
        </div>

<br/>
          </div>
      </main>
      <Modal show={infoshow} onHide={handleinfo} size="xl">
    <Modal.Header>
      Metadata 
      </Modal.Header>
      
        <Modal.Body>
          <div>
            <div id="mapId" style={{height:'250px', width:'100%'}}>
              <img className="edit-location-button" alt='flag' src={countryFlagRef.current} style={{width:"100px", height:"60px"}} />
            </div>
<br/>
<Tabs
      defaultActiveKey="home"
      id="controlled-tab-example"
      className="mb-3"
      tabClassName="color-red"
    >
      <Tab eventKey="home" title="Tabular-view">
        <div class="table-responsive">
      <table class="table table-bordered table-hover">
  <thead>
    <tr>
      <th scope="col" style={{textAlign:'center', backgroundColor:"#215E95", color:'white',minWidth:'210px'}}>Metadata</th>
      <th scope="col" style={{textAlign:'center', backgroundColor:"#215E95", color:'white'}}>Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Title</td>
      <td>{table.title}</td>
    </tr>
    <tr>
      <td>Abstract</td>
      <td>{table.description}</td>
    </tr>
    <tr>
      <td>Temporal Coverage From</td>
      <td>{table.temporal_coverage_from}</td>
    </tr>
    <tr>
      <td>Temporal Coverage To</td>
      <td>{table.temporal_coverage_to}</td>
    </tr>
    <tr>
      <td>Language</td>
      <td>{table.language}</td>
    </tr>
    <tr>
      <td>Version</td>
      <td>{table.version}</td>
    </tr>
    <tr>
      <td>Restricted</td>
      <td>{String(table.is_restricted)}</td>
    </tr>
    <tr>
      <td>Data Type</td>
      <td> <span class="badge bg-success" style={{fontSize:'14px'}}>{table.data_type}</span></td>
    </tr>
    <tr>
      <td>Country</td>
      <td><img alt='flag' src={countryFlagRef.current} style={{width:"50px", height:"28px"}} /> &nbsp;{table.country} </td>
    </tr>
    <tr>
      <td>Project</td>
      <td>{table.project} </td>
    </tr>
    <tr>
      <td>Publisher</td>
      <td>{table.organization}</td>
    </tr>
    <tr>
      <td>Contact</td>
      <td>{table.contact}</td>
    </tr>
    <tr>
      <td>Tags</td>
      <td>
      {table.tags.map(tags => {
           return (
          <>  <span class="badge bg-primary" style={{fontSize:'14px'}}>#{tags}</span>&nbsp;</>
           )
         })}
         </td>
    </tr>
    <tr>
      <td>Topics</td>
      <td>
      {table.topics.map(topics => {
           return (
          <>  <span class="badge bg-primary" style={{fontSize:'14px'}}>#{topics}</span>&nbsp;</>
           )
         })}
         </td>
    </tr>
    <tr>
      <td>Spatial Projection</td>
      <td> <span class="badge bg-warning text-dark" style={{fontSize:'14px'}}>{table.spatial_projection}</span></td>
    </tr>
    <tr>
      <td>Source url</td>
      <td>{table.sourceurl}</td>
    </tr>
    <tr>
      <td>Created at</td>
      <td>{table.created_at}</td>
    </tr>
    <tr>
      <td>Updated at</td>
      <td>{table.updated_at}</td>
    </tr>
    <tr>
      <td>License</td>
      <td>{table.license}</td>
    </tr>
  </tbody>
</table>
</div>
      </Tab>
      <Tab eventKey="profile" title="JSON-view">
      <JSONPretty  id="json-pretty" data={infotext} theme={JSONPrettyMon} mainStyle="padding:-10em" valueStyle="font-size:1em"></JSONPretty>
      
      </Tab>
    </Tabs>


        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleinfo}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>

      <Modal show={infoshow2} onHide={handleinfo2} size="lg">
    <Modal.Header>
      Information
      </Modal.Header>
      
        <Modal.Body>
          <div>
          <textarea class="form-control full-width" rows="20" placeholder="Metadata details" width="100%" value={metadata} onChange={handlemetatext}>
          {infotext2}
          </textarea>

         </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="warning">
            Update
          </Button>
          <Button variant="secondary" onClick={handleinfo2}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
      <Modal show={infoshow22} onHide={handleinfo22} size="lg" centered={true} >
  <Modal.Header className={css} >
      {header}
    </Modal.Header>
      
        <Modal.Body>
          <div>
          {message}
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleinfo22}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
      <Modal size="lg" centered={true} >
  <Modal.Header >
      Fake model
    </Modal.Header>
      
        <Modal.Body>
          <div>
          <MapContainer center={[0.878032, 185.843298]} zoom={3} scrollWheelZoom={true} >

</MapContainer>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
      </div>
      
    );  
}

export default Home;