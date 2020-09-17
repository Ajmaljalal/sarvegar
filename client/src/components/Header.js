import connect from '../../node_modules/react-redux/lib/connect/connect';
import { Link } from 'react-router-dom';
import Payments from './Payments';
import './CSS/header.css';

import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import SideDrawer from './SideDrawer';
//import $ from 'jquery';

// class Header extends Component {

//   renderHeader (){
//     switch (this.props.auth) {
//       case null:
//         return "Loading..."
//       case false:
//         return <li><a href="/auth/google/start">Login with Google</a></li>
//       default:
//         return [
//           <li key= '1'><Payments /></li>,
//           <li key = '3' style = {{margin: '0 10px'}}>
//             Credits: {this.props.auth.credits > 0 ? this.props.auth.credits: 0}
//           </li>,
//           <li key = '2'><a href = '/api/logout'>Logout</a></li>
//         ];
//     }
//   }


//   render() {
//     return (
//       <div className = 'navbar-fixed'>
//         <nav  style = {{padding: '0 40px'}} className='navbar'>
//           <div className="nav-wrapper">
//               <div>
//                 <Link 
//                   to = {this.props.auth ? '/dashboard' : '/'} 
//                   className="brand-logo"
//                   >
//                   <i className='material-icons left large hide-on-med-and-down'>near_me</i>
//                   Sarvegar
//                 </Link>
//               </div>
//     {/*<a href="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>*/}
//               <div>
//                   <ul className = 'right'>
//                     {this.renderHeader()}
//                   </ul>
//               </div>

//           </div>
//         </nav>

//         <ul className="sidenav" id="nav-mobile">
//           {this.renderHeader()}
//         </ul>
//       </div>
//     )
//   }
// }

// const mapStateToProps = ({auth}) => {
//   return ({auth})
// }

// export default connect(mapStateToProps)(Header);







class Header extends Component {

    renderHeader = () => {
      switch (this.props.auth) {
        case null:
          return "Loading..."
        case false:
          return <li><a href="/auth/google/start">Login with Google</a></li>
        default:
          return [
            <li key= '1'><Payments /></li>,
            <li key = '3' style = {{margin: '0 10px'}}>
              Credits: {this.props.auth.credits > 0 ? this.props.auth.credits: 0}
            </li>,
            <li key = '2'><a href = '/api/logout'>Logout</a></li>
          ];
      }
    }


    render() {
        return (
            <div>
                <AppBar
                    position = 'fixed'
                    style = {{
                        backgroundColor: '#214B00',
                        boxShadow: 'none',
                        padding: '10px 0'
                    }}
                >
                
                    <Toolbar className = 'toolbar'>
                        <div className='header_logo'>
                            <div className='font_righteous header_logo_venue'>
                                <Link 
                                    to = {this.props.auth ? '/dashboard' : '/'} 
                                    className="brand-logo"
                                    >
                                    Sarvegar
                                </Link>
                            </div>
                        </div>
                        <div>
                            <ul className='header_buttons'>
                                {this.renderHeader()}
                            </ul>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = ({auth}) => {
  return ({auth})
}


export default connect(mapStateToProps)(Header);


