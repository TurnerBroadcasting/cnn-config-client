import React, {Component} from 'react';
import NavBar from '../common/NavBar';
import axios from 'axios';
import config from '../../config';
import toastr from 'toastr';
import ReactJson from 'react-json-view';
import Dialog from 'react-bootstrap-dialog';
const $=window.$;

class Main extends Component
{
    
    constructor()
    {
        super();
        this.state = {
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
            isLoading: false,
            configs:[],
            product:'',
            environment:'',
            token:'',
            data:{},
            config:{_id:null,product:'',environment:'dev',data:{}}
        };

    }
    componentDidMount()
    {
       
        this.init();
        Dialog.setOptions({
            defaultOkLabel: 'Yes',
            defaultCancelLabel: 'No',
            primaryClassName: 'btn-success'
          })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this));
    }
    
   async init()
   {
       try {
        let output=await axios.post(`${config.apiServerUrl}/configs`,null,{headers:{'Authorization':config.authToken}});

        this.setState({configs:output.data});
       }
       catch(e)
       {
           console.log(e);
           this.setState({configs:[]});
       }
   }
   deleteConfig(cfg)
  {
    this.dialog.show({
        title: `Delete Config : ${cfg.product}`,
        body: `Are you sure ?`,
        actions: [          
          Dialog.OKAction(()=>{
              this.handleDelete(cfg._id);
          }),
          Dialog.CancelAction()
        ],
        bsSize: 'small',
        onHide: (dialog) => {
          dialog.hide()
          console.log('closed by clicking background.')
        }
      })
  }
  handleDelete =  async (id) =>
  {
       
       try {
            
            await axios.delete(`${config.apiServerUrl}/config/${id}`,{headers:{'Authorization':config.authToken}});
            toastr.success('Config deleted successfuly!');
            this.init();
       }
       catch(e)
       {
           console.log(e);
           toastr.error('delete failed : ' + e.message);
       }
  }
    handleResize() {
        this.setState({windowHeight: window.innerHeight, windowWidth: window.innerWidth});
    }
    handleInput(e)
    {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }
    handleSubmit = async (e)=>
    {
        e.preventDefault();
        let {id,product,environment,token,data}=this.state;
        let payload={
            _id:id,
            product:product,
            environment:environment,
            token:token,
            data:data        
        }
        console.log(payload);
        if(product.length > 0 && environment.length > 0)
        {
            try {
                let _route=id ? `${config.apiServerUrl}/update`:`${config.apiServerUrl}/register`;  
                await axios.post(_route,payload,{headers:{'Authorization':config.authToken}});
                 toastr.success('Data saved!')
                 this.init();
            }
            catch(e)
            {
                toastr.error(e.message);
            }
            finally {
                $('#modalConfig').modal('toggle');
            }
        }
        else
        {
            toastr.error('Required data is missing!');
        }
    }
    resetForm()
    {
        this.setState({mode:null,id:null,product:'',token:'',environment:'dev',data:{}});
    }
    editConfig(cfg)
    {
        this.resetForm();
        if(cfg._id)
        {
            this.setState({mode:'update',id:cfg._id,token:cfg.token,product:cfg.product,environment:cfg.environment,data:cfg.data});
        }
    
        $('#modalConfig').modal();
    }
    onEdit(e)
    {
        console.log(e);
        this.setState({data:e.updated_src});
    }
    onBlur(e)
    {
        console.log(e);
    }
     render() {
       
        let {configs}=this.state;
            if(configs.length <=0 ) return <div className="loading"></div>;

       return (
        <div className="container">
         <NavBar/>   
           <div className="row" style={{paddingTop:150}}>
                <section>
                <div className="row">
                        <div className="col-xs-12">
                            <div className="btn-toolbar pull-right">
                            <button className="btn btn-success pull-right" type="button" data-toggle="modal" onClick={()=>{this.editConfig(this.state.config);}}>Register</button>
                        </div>
                            <div className="page-header">                             
                                <h3>Manage Configs</h3>
                            </div>
                            <div className="panel-group" id="configContainer" aria-multiselectable="false">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a data-toggle="collapse" data-parent="#configContainer" href="#configList" aria-expanded="true" >Configs </a>
                                                <span className="badge" >&nbsp; {configs.length ? configs.length : 0} &nbsp;</span>
                                            </h4>
                                        </div>
                                        <div id="configList" className="row  panel-collapse collapse in">
                                            <div className="col-md-12">
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Product</th>
                                                                <th>Env</th>
                                                                <th>Token</th>
                                                                <th>Data</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                                {
                                                                    configs.map((cfg)=>{
                                                                    return(<tr key={cfg._id}>
                                                                            <td><label className="control-label">{cfg.product}</label></td>
                                                                            <td><label className="control-label">{cfg.environment}</label></td>
                                                                            <td><label className="data">{cfg.token}</label></td>
                                                                            <td><label className="control-label"><div className="data"><ReactJson  name={false} collapsed={false} collapseStringsAfterLength={25} enableClipboard={false} displayDataTypes={false} src={cfg.data || {}}></ReactJson></div></label></td> 
                                                                            <td>
                                                                                <div className="actions">
                                                                                    <div className="btn-toolbar pull-right">                                           
                                                                                        <button type="button" className="btn btn-info btn-sm " onClick={()=>this.editConfig(cfg)}>Edit&nbsp;&nbsp;<span className="glyphicon glyphicon-edit"></span></button>
                                                                                        <button type="button" className="btn btn-danger btn-sm " onClick={()=>this.deleteConfig(cfg)}>Delete&nbsp;<span className="glyphicon glyphicon-trash"></span></button>
                                                                                    </div>
                                                                                </div>
                                                                            </td>                                                      
                                                                        </tr>);
                                                                    })
                                                                }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div> 
                    </div>   
                </section>
            </div>
            
            <div className="modal modal-wide fade" id="modalConfig" data-backdrop="static"  data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="modalPosterLabel">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={()=>{this.resetForm()}} data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="modalPosterLabel">{this.state.product}</h4>
                        </div>
                        <div className="modal-body">
                                <div className="form-group">
                                        <form role="form" className="form-poster" encType="multipart/form-data" onSubmit={(e)=>this.handleSubmit(e)}>
                                            <fieldset className="form-group">
                                                <div className="form-group row">
                                                    <label htmlFor="Name" className="col-xs-2 col-form-label">Product : </label>
                                                    <div className="col-xs-8">
                                                        <input  className="form-control" id="Name" disabled={this.state.mode==='update'} name="product"  maxLength="150" type="text" value={this.state.product} onChange={this.handleInput.bind(this)}  required placeholder="Product Name" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="env" className="col-xs-2 col-form-label">Environment : </label>
                                                    <div className="col-xs-8">
                                                        <input  className="form-control" id="env" disabled={this.state.mode==='update'} name="environment" maxLength="10" type="text" value={this.state.environment} onChange={this.handleInput.bind(this)} required placeholder="Dev,Prod,Stage ..." />
                                                    </div>
                                                </div>   
                                                <div className="form-group row">
                                                    <label htmlFor="data" className="col-xs-2 col-form-label">Data : </label>
                                                    <div className="col-xs-10">
                                                        <ReactJson  name={false} collapsed={false}  enableClipboard={false} displayDataTypes={false} onAdd={(e)=>{this.onEdit(e)}} onEdit={(e)=>{this.onEdit(e)}} onDelete={(e)=>{this.onEdit(e);}} src={this.state.data}></ReactJson>                                                       
                                                    </div>
                                                </div>   
                                                                 
                                            </fieldset>
                                            <div className="form-group row">
                                                    <div className="btn-toolbar pull-right">
                                                        <button type="submit" className="btn btn-primary">Submit</button>
                                                        <button type="button" className="btn btn-default" data-dismiss="modal" onClick={()=>{this.resetForm();}}>Close</button>
                                                    </div>
                                            </div>
                                        </form>
                                </div>
                        </div>
                    </div>
                </div>
            </div>  
            <Dialog ref={(el) => { this.dialog = el }} />               
    </div>                                                        
    )  
   
        
    }
}
 
export default Main;