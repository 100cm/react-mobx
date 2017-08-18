
import  './helpers/react_components'
import  React from 'react'
import {render} from 'react-dom'
import {Provider} from "mobx-react/custom";
import  {Router, browserHistory} from 'react-router'
import  WelcomePage from './views/welcome/index'
import {routes} from "./routes/routes.config";
import  './styles/index.css'
import login from "./model/login";
import  global from "./model/global"
import AtyunApp from "./model/atyun_app";
import AppInstance from "./model/app_instance";
import User from './model/user'
import  '../lib/animate.css'
import ContentCategory from "./model/atuyn_site/content_category";
import  Content from './model/atuyn_site/content'
require('particles.js')
const stores = {login:new login(),global:new global(),atyun_app:new AtyunApp(),
    app_instance:new AppInstance(),user:new User(),content_category: new ContentCategory(),content:new Content()
}

console.info('Doggy附体，绝不宕机!\n'+
'           .,:,,,                                        .::,,,::.\n'+
'         .::::,,;;,                                  .,;;:,,....:i:\n'+
'          :i,.::::,;i:.      ....,,:::::::::,....   .;i:,.  ......;i.\n'+
'         :;..:::;::::i;,,:::;:,,,,,,,,,,..,.,,:::iri:. .,:irsr:,.;i.\n'+
'         ;;..,::::;;;;ri,,,.                    ..,,:;s1s1ssrr;,.;r,\n'+
'         :;. ,::;ii;:,     . ...................     .;iirri;;;,,;i,\n'+
'         ,i. .;ri:.   ... ............................  .,,:;:,,,;i:\n'+
'         :s,.;r:... ....................................... .::;::s;\n'+
'         ,1r::. .............,,,.,,:,,........................,;iir;\n'+
'         ,s;...........     ..::.,;:,,.          ...............,;1s\n'+
'        :i,..,.              .,:,,::,.          .......... .......;1,\n'+
'       ir,....:rrssr;:,       ,,.,::.     .r5S9989398G95hr;. ....,.:s,\n'+
'      ;r,..,s9855513XHAG3i   .,,,,,,,.  ,S931,.,,.;s;s&BHHA8s.,..,..:r:\n'+
'     :r;..rGGh,  :SAG;;G@BS:.,,,,,,,,,.r83:      hHH1sXMBHHHM3..,,,,.ir.\n'+
'    ,si,.1GS,   sBMAAX&MBMB5,,,,,,:,,.:&8       3@HXHBMBHBBH#X,.,,,,,,rr\n'+
'    ;1:,,SH:   .A@&&B#&8H#BS,,,,,,,,,.,5XS,     3@MHABM&59M#As..,,,,:,is,\n'+
'   .rr,,,;9&1   hBHHBB&8AMGr,,,,,,,,,,,:h&&9s;   r9&BMHBHMB9:  . .,,,,;ri.\n'+
'   :1:....:5&XSi;r8BMBHHA9r:,......,,,,:ii19GG88899XHHH&GSr.      ...,:rs.\n'+
'   ;s.     .:sS8G8GG889hi.        ....,,:;:,.:irssrriii:,.        ...,,i1,\n'+
'   ;1,         ..,....,,isssi;,        .,,.                      ....,.i1,\n'+
'   ;h:               i9HHBMBBHAX9:         .                     ...,,,rs,\n'+
'   ,1i..            :A#MBBBBMHB##s                             ....,,,;si.\n'+
'   .r1,..        ,..;3BMBBBHBB#Bh.     ..                    ....,,,,,i1;\n'+
'    :h;..       .,..;,1XBMMMMBXs,.,, .. :: ,.               ....,,,,,,ss.\n'+
'     ih: ..    .;;;, ;;:s58A3i,..    ,. ,.:,,.             ...,,,,,:,s1,\n'+
'     .s1,....   .,;sh,  ,iSAXs;.    ,.  ,,.i85            ...,,,,,,:i1;\n'+
'      .rh: ...     rXG9XBBM#M#MHAX3hss13&&HHXr         .....,,,,,,,ih;\n'+
'       .s5: .....    i598X&&A&AAAAAA&XG851r:       ........,,,,:,,sh;\n'+
'       . ihr, ...  .         ..                    ........,,,,,;11:.\n'+
'          ,s1i. ...  ..,,,..,,,.,,.,,.,..       ........,,.,,.;s5i.\n'+
'           .:s1r,......................       ..............;shs,\n'+
'           . .:shr:.  ....                 ..............,ishs.\n'+
'               .,issr;,... ...........................,is1s;.\n'+
'                  .,is1si;:,....................,:;ir1sr;,\n'+
'                     ..:isssssrrii;::::::;;iirsssssr;:..\n'+
'                          .,::iiirsssssssssrri;;:.\n'
)

// add helpers:
render(<Provider {...stores}>
    <Router routes={routes} history={browserHistory}/>
    </Provider>,
    document.getElementById('app')
)

