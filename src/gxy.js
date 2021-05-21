import Promise from 'bluebird';
import _ from 'lodash';
import Util from './libs/util';
import Cache from './libs/cache';

window.GXY = window.GXY || {};
window.Promise = Promise;
window.GXY._ = _;
window.GXY.Util = Util;
window.GXY.Cache = new Cache();

export default window.GXY;
