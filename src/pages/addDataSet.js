import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Multiselect from 'multiselect-react-dropdown';
import '../css/date.css';
import TableRows from "./TableRows"
import addimage from '../assets/add.png';
import {Button,Modal} from "react-bootstrap";
import AuthService from "../services/auth.service";
import UploadFiles from "./satellite.files.componenet";
import './drop.css'
const AddDataSet = () => {
    const [rowsData, setRowsData] = useState([]);
    const [unauthorized, setUnauthorized] = useState(false);
    const addTableRows = ()=>{

        const rowsInput={
          datat: datatypelist,
            fullName:'',
            emailAddress:'',
        } 
        setRowsData([...rowsData, rowsInput])
      
    }

  const [infoshow2, setinfoshow2] = useState(false);
  const handleinfo2 = () => {
    setinfoshow2(false)
  };
  const [message, setMessage] = useState('');
  const [css, setCss] = useState('btn btn-warning');
  const [header, setHeader] = useState('Success');

  const [infoshow22, setinfoshow22] = useState(false);
  const handleinfo22 = () => {
    setinfoshow22(false)
  };

    const [startDate, setStartDate] = useState();
    
    const [endDate, setEndDate] = useState();
    const [publisher, setPublisher]  = useState("Pacific Community");

    const [spatialInfo, setSpatialInfo] = useState("vector");
    const [westBoundingLongitude, setwestBoundingLongitude] = useState("-180.221");
    const [eastBoundingLongitude, seteastBoundingLongitude] = useState("2112");
    const [southBoundingLatitude, setsouthBoundingLatitude] = useState("2112");
    const [northBoundingLatitude, setnorthBoundingLatitude] = useState("2112");
    const [geospatialReferenceSystem, setgeospatialReferenceSystem] = useState("EPSG:4326");
    const [dataQualityChecked, setdataQualityChecked] = useState(true);
    const [contactName, setcontactName] = useState("Anuj");
    const [contactEmail, setcontactEmail] = useState("divesha@spc.int");
    const [license, setLicense] = useState("Open License");
    const [accessUrl, setaccessUrl] = useState("x");
    const [accessServer, setaccessServer] = useState("x");
    const [fileUrl, setfileUrl] = useState("x");
    const [fileName, setfileName] = useState("X"); 


    const [datatype, setDatatype]  = useState("satellite");
    const [datatypelist,setDatatypelist] = useState([]);
    const [country, setCountry]  = useState();
    const [countrylist,setCountrylist] = useState([]);
    const [project, setProject]  = useState('tcap');
    const [projectlist,setProjectlist] = useState([]);
    const [contact, setContact]  = useState('1');
    const [contactlist,setContactlist] = useState([]);
    const [tag, setTag]  = useState([{key:1,label:"Oceanography"}]);
    const [taglist,setTaglist] = useState([]);
    const [topic, setTopic]  = useState([{key:1,label:"Geoscience"}]);
    const [topiclist,setTopiclist] = useState([]);
    const [flag, setFlag]  = useState([{key:1,label:"raw"}]);
    const [flaglist,setflaglist] = useState([]);
    const [parameter, setParameter]  = useState('');
    const [parameterlist,setParameterlist] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [title, setTitle] = useState('Shoreline change analysis 2024');
    const [description, setDescription] = useState('This was done using Qgis');
    const [restricted, setRestricted] = useState(true);
    const [token, setToken] = useState(null);
    const [extent, setExtent] = useState();
    const handleTitle = event => {
      setTitle(event.target.value);
    };
    const handleSpatialInfo = e =>{
        setSpatialInfo(e.target.value)
    }
    const handleSouth = e =>{
        setsouthBoundingLatitude(e.target.value)
    }
    const handleNorth = e =>{
        setnorthBoundingLatitude(e.target.value)
    }
    const handleWest = e =>{
        setwestBoundingLongitude(e.target.value)
    }
    const handleEast = e =>{
        seteastBoundingLongitude(e.target.value)
    }
    const handleReferenceSystem = e =>{
        setgeospatialReferenceSystem(e.target.value)
    }
    const handleName = e =>{
        setcontactName(e.target.value)
    }
    const handleEmail = e =>{
        setcontactEmail(e.target.value)
    }
    const handlePublisher = e =>{
        setPublisher(e.target.value)
    }
    const handleLicense = e =>{
        setLicense(e.target.value)
    }
    const handleAccessUrl = e =>{
        setaccessUrl(e.target.value)
    }
    const handleAccessServer = e =>{
        setaccessServer(e.target.value)
    }
    const handlefileUrl = e =>{
        setfileUrl(e.target.value)
    }
    const handlefileName = e =>{
        setfileName(e.target.value)
    }





    const handleDescription = event => {
      setDescription(event.target.value);
    };
  
    const fetchtags = () => {
      axios
        .get('https://opmdata.gem.spc.int/api/tags')
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
    const fetchtopic = () => {
      axios
        .get('https://opmdata.gem.spc.int/api/topics')
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
  
      useEffect(() => {  
        const user = AuthService.getCurrentUserCookie();
        if (user === null || user === undefined){
         // setUnauthorized(true);
         setUnauthorized(false)
        }
        else{
            setToken('xxx')
        //  setToken(user.accessToken)
          setUnauthorized(false);
        //fetchOrganizations();
     
        fetchtags();
        fetchtopic();
        addTableRows();
      }
        const intervalId = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000); // Update every second
     
        return () => clearInterval(intervalId); // Cleanup on component unmount
    
          },[]);
          
          const formattedTime = currentTime.toLocaleTimeString();
          const formattedDate = currentTime.toISOString().slice(0, 10);
  
      function getkeyArray(list){
        var topicarr = [];
          for( var i = 0; i< list.length; i++){
            topicarr.push(list[i]['key'])
          }
        return topicarr;
      }
  
      function formatDate(startDate){
        const date = startDate; // Current date and time
  
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
  
        const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  
        return formattedDateTime;
      }
        /*
      const handleSubmitold=(e)=>{

        if (title === '' || description === '' || startDate === '' || endDate === '' || datatype === ''|| project === '' ||
        contact === '' || tag === '' || country === '' || parameter === '' || extent === '' || restricted === '' || topic ==='' ||
        rowsData === '' || flag === ''){

          setinfoshow2(true)
        }
        else {
        console.log(rowsData)
        var arr_urls = [];
        for (var i=0; i<rowsData.length; i++){
            console.log(rowsData[i].fullName, rowsData[i].emailAddress)
            arr_urls.push({"url":rowsData[i].fullName,"path":rowsData[i].emailAddress})
        }
        var extent_arr = [];
        var splitted = extent.split(', ');
        for (var k=0; k<splitted.length; k++){
          var split2 = splitted[k].split('=')
          extent_arr.push({"name":split2[0],"value":split2[1]})
      }
   //   console.log(extent_arr)
        
       const metadata = { title: title, description: description, version:"1.0.0", temporal_coverage_from: formatDate(startDate), temporal_coverage_to: formatDate(endDate), data_type: datatype, project_id: project,
          publisher_id:publisher, contact_id: contact, tag:getkeyArray(tag), country:[country],parameters: getkeyArray(parameter),extents:extent_arr, is_checked:true, is_restricted:restricted, topic: getkeyArray(topic), 
          urls:arr_urls,flag: getkeyArray(flag), user_created_id:contact};
          console.log(metadata)
          const header = {
            'Content-Type': 'application/json',
            'x-access-token': token
          }
            axios.post('https://opmdata.gem.spc.int/api/metadata/add', metadata, {headers:header})
              .then(response2 => {
                var temptext = response2.data.message;
                let result = temptext.includes("Exists!");
                if (!result){
                  setCss('btn btn-success')
                  setHeader('Success')
                }
                else{
                setCss('btn btn-warning')
                setHeader('Warning')
                }
                setMessage(response2.data.message)
                setinfoshow22(true)
            }).catch((error) => {
              setCss('btn btn-danger')
              setHeader('Error')
              setMessage('Opps! An Error Occurred. Please contact Administrator.')
              setinfoshow22(true)
          });
  
          
       
      // const formattedDateTime = startDate.toISOString();
        }
       // console.log(metadata)
        e.currentTarget.blur();
        }*/
  
        const handleSubmit= async (e)=>{

           const metadata = { title: title, abstract: description,langugae:"en", version:"1.0.0",
            temporalCoverageFrom: formatDate(startDate), temportalCoverageTo: formatDate(endDate),
            openAccess:restricted, dataType:datatype, project:project, spatialRepresentationInfo:spatialInfo,
            westBoundingLongitude:westBoundingLongitude, eastBoundingLongitude:eastBoundingLongitude,
            southBoundingLatitude:southBoundingLatitude, northBoundingLatitude:northBoundingLatitude,
            geospatialReferenceSystem:geospatialReferenceSystem,dataQualityChecked:dataQualityChecked,
            contactName:contactName, contactEmail:contactEmail, publisher:publisher, license:license,
            accessUrl:accessUrl, accessServer:accessServer, tag:"Ocean", topic:"Geoscience"};
              console.log(metadata)

                await axios.post('https://opmdata.gem.spc.int/dbms/api/datastore/addnofile', metadata)
                  .then(response2 => {
                    var temptext = response2.data.message;
                    let result = temptext.includes("Exists!");
                    if (!result){
                      setCss('btn btn-success')
                      setHeader('Success')
                    }
                    else{
                    setCss('btn btn-warning')
                    setHeader('Warning')
                    }
                    setMessage(response2.data.message)
                    setinfoshow22(true)
                }).catch((error) => {
                    console.log(error)
                  setCss('btn btn-danger')
                  setHeader('Error')
                  setMessage('Opps! An Error Occurred. Please contact Administrator.')
                  setinfoshow22(true)
              });
            }



      return (
  <div>
      {!unauthorized ?
  <>

          <div className="container">
            <br/>
          <div class="card">
    <div class="card-header  text-white" style={{backgroundColor: "#5cb85c"}}>
    <div className="col-sm-12 d-flex justify-content-start">
    <h5 class="card-title">Metadata Add</h5>
              </div>
    </div>
    <div class="card-body">
    <div className="row" >
    <div className="col-sm-6">
        <UploadFiles/>
        </div>
        </div>
        <div className="row" >
      <div className="col-sm-6">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">fileUrl</label>  <span style={{ color: 'red' }}>*</span>
      <input type="email" class="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" onChange={handlefileUrl} value={fileUrl}/>
    </div>
        </div>
        </div>
        <div className="row" >
      <div className="col-sm-6">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">fileName</label>  <span style={{ color: 'red' }}>*</span>
      <input type="email" class="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" onChange={handlefileName} value={fileName}/>
    </div>
        </div>
        </div>
      <div className="row" >
      <div className="col-sm-6">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Title</label>  <span style={{ color: 'red' }}>*</span>
      <input type="email" class="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" onChange={handleTitle} value={title}/>
    </div>
        </div>
        </div>
        <div className="row" >
        <div className="col-sm-6">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Abstract</label> <span style={{ color: 'red' }}>*</span>
      <input type="email" class="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Description" onChange={handleDescription} value={description}/>
    </div>
        </div>
          </div>
          <div className="row" >
      <div className="col-sm-2">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Temporal coverage from</label> <span style={{ color: 'red' }}>*</span>
      <div style={{paddingTop:'2px',width:'900px'}}>
  
      <DatePicker wrapperClassName="datepicker" style={{marginTop:100}} selected={startDate} onChange={(date) => setStartDate(date)} />
  
    </div>
    </div>
        </div>
        <div className="col-sm-2">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Temporal coverage to</label> <span style={{ color: 'red' }}>*</span>
      <div style={{paddingTop:'2px'}}>
      <DatePicker id="exampleInputEmail1" selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>
    </div>
        </div>
       
          </div>
          <div className="row" >
        <div className="col-sm-6">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Language</label> <span style={{ color: 'red' }}>*</span>
      <input type="email" class="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Description" value={"en"}/>
    </div>
        </div>
          </div>
          <div className="row" >
        <div className="col-sm-6">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Version</label> <span style={{ color: 'red' }}>*</span>
      <input type="email" class="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Description" value={"1.0.0"}/>
    </div>
        </div>
          </div>
          <div className="row" >
          <div className="col-sm-6">
        <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Open Access</label> <span style={{ color: 'red' }}>*</span>
      <select className="form-select form-select-sm"  id="exampleInputEmail2" aria-label=".form-select-sm example" value={restricted}
              onChange={(e) => setRestricted(e.currentTarget.value)}>
                <option value="select">-- Select --</option>
      <option value={true}>Yes</option>
      <option value={false}>No</option>
  </select>
    </div>
        </div>
        </div>
        <div className="row" >
          <div className="col-sm-6">
        <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Data Type</label> <span style={{ color: 'red' }}>*</span>
      <select className="form-select form-select-sm"  id="exampleInputEmail23" aria-label=".form-select-sm example" value={datatype}
              onChange={(e) => setDatatype(e.currentTarget.value)}>
                <option value="select">-- Select --</option>
      <option value={"satellite"}>Satellite Imagery</option>
      <option value={"shoreline"}>Shoreline</option>
  </select>
    </div>
        </div>
        </div>
        <div className="row" >
          <div className="col-sm-6">
        <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Project</label> <span style={{ color: 'red' }}>*</span>
      <select className="form-select form-select-sm"  id="exampleInputEmail2" aria-label=".form-select-sm example" value={project}
              onChange={(e) => setProject(e.currentTarget.value)}>
                <option value="select">-- Select --</option>
      <option value={"tcap"}>TCAP</option>
      <option value={"cosppac"}>COSPPAC</option>
  </select>
    </div>
        </div>
        </div>
        <div className="row" >
      <div className="col-sm-6">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Spatial Represenatation Info</label>  <span style={{ color: 'red' }}>*</span>
      <input type="email" class="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" onChange={handleSpatialInfo} value={spatialInfo}/>
    </div>
        </div>
        </div>
        <div className="row" >
      <div className="col-sm-6">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">westBoundingLongitude</label>  <span style={{ color: 'red' }}>*</span>
      <input type="email" class="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" onChange={handleWest} value={westBoundingLongitude}/>
    </div>
        </div>
        </div>
        <div className="row" >
      <div className="col-sm-6">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">eastBoundingLongitude</label>  <span style={{ color: 'red' }}>*</span>
      <input type="email" class="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" onChange={handleEast} value={eastBoundingLongitude}/>
    </div>
        </div>
        </div>
        <div className="row" >
      <div className="col-sm-6">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">southBoundingLatitude</label>  <span style={{ color: 'red' }}>*</span>
      <input type="email" class="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" onChange={handleSouth} value={southBoundingLatitude}/>
    </div>
        </div>
        </div>
        <div className="row" >
      <div className="col-sm-6">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">northBoundingLatitude</label>  <span style={{ color: 'red' }}>*</span>
      <input type="email" class="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" onChange={handleNorth} value={northBoundingLatitude}/>
    </div>
        </div>
        </div>
        <div className="row" >
      <div className="col-sm-6">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">geospatialReferenceSystem</label>  <span style={{ color: 'red' }}>*</span>
      <input type="email" class="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" onChange={handleReferenceSystem} value={geospatialReferenceSystem}/>
    </div>
        </div>
        </div>
        <div className="row" >
          <div className="col-sm-6">
        <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Quality Checked</label> <span style={{ color: 'red' }}>*</span>
      <select className="form-select form-select-sm"  id="exampleInputEmail2" aria-label=".form-select-sm example" value={dataQualityChecked}
              onChange={(e) => setdataQualityChecked(e.currentTarget.value)}>
                <option value="select">-- Select --</option>
      <option value={true}>Yes</option>
      <option value={false}>No</option>
  </select>
    </div>
        </div>
        </div>
        <div className="row" >
      <div className="col-sm-6">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">contactName</label>  <span style={{ color: 'red' }}>*</span>
      <input type="email" class="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" onChange={handleName} value={contactName}/>
    </div>
        </div>
        </div>
        <div className="row" >
      <div className="col-sm-6">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">contactEmail</label>  <span style={{ color: 'red' }}>*</span>
      <input type="email" class="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" onChange={handleEmail} value={contactEmail}/>
    </div>
        </div>
        </div>
        <div className="row" >
      <div className="col-sm-6">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">publisher</label>  <span style={{ color: 'red' }}>*</span>
      <input type="email" class="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" onChange={handlePublisher} value={publisher}/>
    </div>
        </div>
        </div>
        <div className="row" >
      <div className="col-sm-6">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">License</label>  <span style={{ color: 'red' }}>*</span>
      <input type="email" class="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" onChange={handleLicense} value={license}/>
    </div>
        </div>
        </div>
        <div className="row" >
      <div className="col-sm-6">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">accessUrl</label>  <span style={{ color: 'red' }}>*</span>
      <input type="email" class="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" onChange={handleAccessUrl} value={accessUrl}/>
    </div>
        </div>
        </div>
        <div className="row" >
      <div className="col-sm-6">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">accessServer</label>  <span style={{ color: 'red' }}>*</span>
      <input type="email" class="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" onChange={handleAccessServer} value={accessServer}/>
    </div>
        </div>
        </div>
      
        <div className="row" >
        <div className="col-sm-6">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Tag</label> <span style={{ color: 'red' }}>*</span>
      <Multiselect
          displayValue="label"
          isObject={true}
          closeMenuOnSelect={false}
          onRemove={(event) => {
            setTag(event);
          }}
          onSelect={(event) => {
            setTag(event);
          }}
          options={taglist}
          selectedValues={[{key:1,label:"Oceanography"}]}
          showCheckbox
          avoidHighlightFirstOption
        />
  
    </div>
        </div>
        </div>
        <div className="row" >
        <div className="col-sm-6">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Topic</label> <span style={{ color: 'red' }}>*</span>
      <Multiselect
          displayValue="label"
          isObject={true}
          onRemove={(event) => {
            setTopic(event);
          }}
          onSelect={(event) => {
            setTopic(event);
          }}
          options={topiclist}
          selectedValues={[{key:1,label:"Geoscience"}]}
          showCheckbox
          avoidHighlightFirstOption 
        />
    </div>
        </div>
        </div>


          <div className="row">
        <div className="col-sm-6">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Created by</label>
      <input type="email" class="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Description" value="Divesh Anuj" disabled/>
    </div>
        </div>
        </div>
        <div className="row">
        <div className="col-sm-6">
      <div class="form-group form-select-sm" style={{textAlign:'left'}}>
      <label for="exampleInputEmail1">Created at</label>
      <input type="email" class="form-control form-select-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Description" value={formattedDate+" "+formattedTime} disabled/>
    </div>
        </div>
            </div>
  
        
             
  
          </div>
          <div class="card-footer">
   
          <div className="row">
          <div className="col-sm-12 d-flex justify-content-start">
          <button type="button" class="btn btn-success" onClick={handleSubmit}>Register</button>
          </div>
          </div>
  </div>
  
    </div>
  </div>

  <br/>
  <br/>
  <br/>
  <br/>
  <Modal show={infoshow2} onHide={handleinfo2} size="lg" centered={true} >
  <Modal.Header className="btn btn-warning" >
      Warning
    </Modal.Header>
      
        <Modal.Body>
          <div>
          Required (<span style={{ color: 'red' }}>*</span>) fields are should not empty.
         </div>
        </Modal.Body>
        <Modal.Footer>
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
          </>

:
<h2>Unauthorized Access</h2>}
</div>
      );
  }
  
  export default AddDataSet;