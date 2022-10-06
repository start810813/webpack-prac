import './main.css'
import { getIntroTitle, getIntroDesc, getIntroImg } from './libs/components.js'

document.body.appendChild(getIntroTitle())
document.body.appendChild(getIntroDesc())
document.body.appendChild(getIntroImg())
