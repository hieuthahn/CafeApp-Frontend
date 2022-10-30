/**
 * Function that always returns True
 */
const returnTrue = () => true

/**
 * Function that always returns false
 */
const returnFalse = () => false

/**
 * Identity function
 * @param {*} val
 * @return {*}
 */
const identity = (val) => val

const not = (val) => !val

/**
 * Returns a curried function of the provided function, so that:
 *
 * f(a, b, c) = f(a, b)(c) = f(a)(b)(c) = f(a)(b, c)
 *
 * @param {Function} f
 * @param {..*} Initial parameters
 * @return {Function} The curried function
 */
const curry = (f, ...args) =>
	args.length >= f.length ? f(...args) : curry.bind(this, f, ...args)

const allPass = (fs) => (...args) => {
	for (let i = 0; i < fs.length; i++) {
		if (!fs[i].apply(this, args)) {
			return false
		}
	}
	return true
}

/**
 * Takes in a list of predicates and return a function that will
 * pass its arguments through each of the predicates, returning
 * true if any predicate is satisfied.
 *
 * @param {Array<Function>}
 * @return {Function}
 */
const anyPass = (fs) => (...args) => {
	for (let i = 0; i < fs.length; i++) {
		if (fs[i].apply(this, args)) {
			return true
		}
	}

	return false
}

/**
 * Encapsulates switch/case or if/else logic.
 *
 * Takes a list of [predicate, transformer] pairs.
 *
 * The returned function passes its arguments to predicates, evaluates them, and execute the matched transformer (passing the
 * same arguments). If there's no matched predicate, return undefined.
 *
 * @param pairs Pairs of [predicate, transformer]
 * @return {Function} Encapsulated function
 */
const cond = (pairs) => (...args) => {
	for (let i = 0; i < pairs.length; i++) {
		if (pairs[i][0].apply(this, args)) {
			return pairs[i][1].apply(this, args)
		}
	}

	return undefined
}

/**
 * Encapsulate if/else logic. Basically a wrapper of `cond`.
 *
 * @param p Predicate
 * @param {Function} fT Function to call when predicate is true
 * @param {Function} fF Function to call when predicate is false
 * @return {Function} Encapsulated function
 */
const ifElse = (p, fT, fF) => cond([[p, fT], [returnTrue, fF]])

const when = (p, f) => cond([[p, f], [returnTrue, identity]])

/**
 * Functional wrapper for array map function.
 *
 * @param {Function} f
 * @param {*} arr
 */
const map = curry((f, arr) => (Array.isArray(arr) ? arr.map(f) : f(arr)))

const filter = curry((f, arr) =>
	Array.isArray(arr) ? arr.filter(f) : f(arr) ? arr : undefined
)

/**
 * Partial application
 * @param {Function} f
 * @param {..*} args Initial parameters
 */
const partial = (f, ...args) => f.bind(this, ...args)

/**
 * Transform a value by chaining a list of function from left to right
 *
 * @param val
 * @param {..Function} funcs
 * @return {*}
 */
const pipe = (...funcs) =>
	function (val) {
		return funcs.reduce((acc, f) => f.apply(this, [acc]), val)
	}

const always = (val) => partial(val)

/**
 * Get property of an object.
 *
 * This is a curried function.
 *
 * @param {string} prop
 * @param {Object} obj
 * @return {*}
 */
const getProp = curry((prop, obj) => {
	return obj[prop]
})

const lt = curry((b, a) => a < b)

const setProp = curry((prop, value, obj) => {
	obj[prop] = value
	return obj
})

/**
 * Delay execution of callback used on individual items of a list.
 *
 * This function is curried.
 *
 * @param {number} initial Initial timeout
 * @param {number} step Delay per execution
 * @param {Function} callback Callback
 * @param {Array} items
 * @private
 */
const _staggerCallback = (initial, step, callback, items) =>
	items.reduce((delay, item) => {
		setTimeout(() => callback(item), delay)
		return delay + step
	}, initial)

/**
 * Delay execution of callback used on individual items of a list.
 *
 * This function is curried.
 *
 * @param {number} initial Initial timeout
 * @param {number} step Delay per execution
 * @param {Function} callback Callback
 * @param {Array} items
 */
const staggerCallback = curry(_staggerCallback)

/**
 * Encapsulate try/catch logic.
 *
 * Takes a pair of tryer and catcher functions. User must ensure tryer and catcher return the same
 * type so that chaining / composing works.
 *
 * Returns a function that can take arguments, which will be passed to both tryer and catcher.
 *
 * @param {Function} tryer
 * @param {Function} catcher
 * @return {Function} Encapsulated function
 */
const tryCatch = (tryer, catcher) => (...args) => {
	try {
		return tryer(...args)
	} catch (e) {
		return catcher(e, ...args)
	}
}

const whileDo = (pred, fn, initial) =>
	pred(initial) ? whileDo(pred, fn, fn(initial)) : initial

const divide = curry((b, a) => a / b)
const multiply = curry((b, a) => a * b)

/**
 * Check if an array contains an item.
 *
 * This is a curried wrapper for Array.prototype.indexOf
 *
 * @param {Array}
 * @param {*}
 * @return {boolean}
 */
const inArray = curry((array, item) => array.indexOf(item) !== -1)

/**
 * Get the nth element of an array
 *
 * @param {number}
 * @param {Array}
 * @return {*}
 */
const nth = curry((index, array) =>
	index < 0 ? array[array.length + index] : array[index]
)

/**
 * Get the nth element of an array
 *
 * @param {Array}
 * @return {*}
 */
const first = nth(1)

const last = nth(-1)
const add = curry((b, a) => a + b)
const _add1ToLast = pipe(
	last,
	add(1)
)

const range = (from, to) =>
	whileDo(
		pipe(
			_add1ToLast,
			lt(to)
		),
		(array) => [...array, _add1ToLast(array)],
		[from]
	)

const flipArgs = (f) => curry((arg1, arg2) => f.apply(this, [arg2, arg1]))

const count = (arr) => arr.length

/**
 * Create an array out of an array-like object
 *
 * @param {Object} Array-like object
 * @return {Array} Array
 */
const makeArray = (arrayLike) => Array.prototype.slice.call(arrayLike)

/**
 * Log a value to console
 *
 * @param {*} val
 * @returns {*}
 */
const log = (val) => {
	console.log(val)
	return val
}

const logWrap = (fn) => (...args) => log(fn.apply(this, args))

const logArgs = (fn) => (...args) => {
	log(args)
	return fn.apply(this, args)
}

const debounce = (callback, wait, context = this) => {
	let timeout = null
	let callbackArgs = null

	const later = () => callback.apply(context, callbackArgs)

	return function () {
		callbackArgs = arguments
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
	}
}

const then = curry((f, promise) => promise.then(f))
const reject = curry((f, promise) => promise.catch(f))

const parseOptions = (string, def = {}) => {
	let options = {}
	try {
		options = JSON.parse(string)
	} catch (e) {
		console.warn('Invalid option JSON string.')
		console.trace()

		return def
	}

	return Object.assign({}, def, options)
}

/**
 * Throttle a function so that it fires once every { threshold }
 * @param {Function} fn
 * @param {Integer} threshold
 * @param {FunctionContext} scope
 */

const throttle = (fn, threshold, scope) => {
	if (!threshold) {
		threshold = 250
	}

	var last, deferTimer

	return function () {
		var context = scope || this
		var now = +new Date()
		var args = arguments

		if (last && now < last + threshold) {
			// hold on to it
			clearTimeout(deferTimer)
			deferTimer = setTimeout(function () {
				last = now
				fn.apply(context, args)
			}, threshold)
		} else {
			last = now
			fn.apply(context, args)
		}
	}
}

const doesSupportObjectFit = () => {
	const i = document.createElement('img')
	return 'objectFit' in i.style
}

const doesSupportObjectPosition = () => {
	const i = document.createElement('img')
	return 'objectPosition' in i.style
}

const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i)
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i)
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i)
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i)
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i)
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows()
		)
	}
}

/**
 *
 * @param {String} param
 * @param {String} url
 */
const removeQueryArg = (param, url = window.location.href) => {
	const [queryParams] = url.split('?')
	let preservedQueryParams = ''

	if (queryParams) {
		preservedQueryParams = queryParams
			.split('&')
			.filter(
				(queryParam) =>
					!(
						queryParam === param ||
						queryParam.startsWith(`${param}=`)
					)
			)
			.join('&')
	}

	return preservedQueryParams
}

const getQueryVar = (query) => {
	const match = RegExp('[?&]' + query + '=([^&]*)').exec(
		window.location.search
	)

	return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

const addQueryVar = (key, value, url) => {
	return url
		.replace(
			RegExp('([?&]' + key + '(?=[=&#]|$)[^#&]*|(?=#|$))'),
			'&' + key + '=' + encodeURIComponent(value)
		)
		.replace(/^([^?&]+)&/, '$1?')
}

const initScript = (src, id = '') => {
	const script = document.createElement('script')
	script.src = src
	script.async = true
	if (id) {
		script.id = id
	}
	document.getElementsByTagName('head')[0].appendChild(script)
}

const initStyle = (src, id = '') => {
	const script = document.createElement('link')
	script.rel = 'stylesheet'
	script.href = src
	if (id) {
		script.id = id
	}
	document.head.appendChild(script)
}

const pluck = (array, key) => Array.from(new Set(array.map((obj) => obj[key])))

const mobileCheck = () =>
	(window.mobileCheck = () => {
		let check = false
		;(function (a) {
			if (
				/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
					a
				) ||
				/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
					a.substr(0, 4)
				)
			)
				check = true
		})(navigator.userAgent || navigator.vendor || window.opera)
		return check
	})

const convertPriceToCurrencyType = (value) => {
	if (value != '') {
		return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
	} else {
		return ''
	}
}

const convertNumber = (value) => {
	if (value != '') {
		return parseInt(
			value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '')
		)
	} else {
		return ''
	}
}

export {
	add,
	addQueryVar,
	allPass,
	always,
	anyPass,
	cond,
	count,
	debounce,
	doesSupportObjectFit,
	doesSupportObjectPosition,
	getQueryVar,
	initScript,
	initStyle,
	log,
	logArgs,
	logWrap,
	makeArray,
	curry,
	divide,
	filter,
	first,
	flipArgs,
	getProp,
	identity,
	ifElse,
	inArray,
	isMobile,
	parseOptions,
	last,
	lt,
	map,
	multiply,
	not,
	nth,
	partial,
	pipe,
	pluck,
	range,
	returnTrue,
	returnFalse,
	removeQueryArg,
	setProp,
	staggerCallback,
	then,
	throttle,
	reject,
	tryCatch,
	when,
	whileDo,
	mobileCheck,
	convertPriceToCurrencyType,
	convertNumber
}
