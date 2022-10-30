/* global Element, getComputedStyle, CustomEvent */
import {
	makeArray,
	curry,
	getProp,
	parseOptions,
	setProp,
	partial,
	pipe,
	map,
	whileDo
} from 'lib/utils'

const _getElementRect = (el) => el.getBoundingClientRect()

/**
 * Add class to a list of elements. This is a curried function.
 *
 * @param {string} className
 * @param {Array<HTMLElement>} els
 * @return {Array<HTMLElement>} Same elements for chaining
 */
const addClass = curry((className, els) =>
	map((el) => {
		el.classList.add(className)
		return el
	}, els)
)

const append = curry((parent, els) => map((el) => parent.appendChild(el), els))

const prepend = curry((parent, els) =>
	map(
		(el) => parent.insertBefore(el, parent.firstChild),
		Array.isArray(els) ? els.reverse() : els
	)
)

const appendHtml = (el, html) => {
	el.insertAdjacentHTML('beforeend', html)
	return el
}

const appendNode = (el, node) => {
	el.parentNode.insertBefore(node, el.nextSibling)
	return el
}

const createNodes = (html) => {
	const wrapper = document.createElement('div')
	appendHtml(wrapper, html)
	return getChildren(wrapper)
}

const preventDefault = (e) => {
	e.preventDefault()
	return e
}

/**
 * Set style for an element.
 *
 * This is a curried function.
 *
 * @param {string} k Style name
 * @param {string} v Style value
 * @param {HTMLElement} el Element
 * @return {HTMLElement}
 */
const setStyle = curry((k, v, el) => {
	el.style[k] = v
	return el
})

const setHeight = setStyle('height')

const hide = setStyle('display', 'none')

/**
 * Get a style for an element.
 *
 * This is a curried function.
 *
 * @param {string} k Style name
 * @param {HTMLElement} el
 * @return {string}
 */
const getStyle = curry((k, el) => getComputedStyle(el)[k])

/**
 * Get actual height of an element, including padding
 *
 * @param {HTMLElement} el
 * @return {number}
 */
const getHeight = getProp('clientHeight')

/**
 * Get scroll top position of an element.
 *
 * Default to getting scrolling position of the viewport
 *
 * @param {HTMLElement} el
 * @return {number}
 */
const getScrollTop = (el = document.documentElement) =>
	el === document.documentElement
		? window.pageYOffset || el.scrollTop
		: el.scrollTop

/**
 * Check to see if an element has a specified class.
 *
 * @param {string} className
 * @param {HTMLElement} el
 */
const hasClass = curry((className, el) => el.classList.contains(className))

/**
 * Get attribute value for an element.
 *
 * @param {string} name
 * @param {HTMLElement} el
 * @return {string}
 * @private
 */
const _getAttribute = (name, el) => el.getAttribute(name)

/**
 * Get attribute value for an element.
 *
 * This is a curried function
 *
 * @param {string} name
 * @param {HTMLElement} el
 * @return {string}
 */
const getAttribute = curry(_getAttribute)

const setAttribute = curry((name, value, el) => {
	el.setAttribute(name, value)
	return el
})

/**
 * Get data attribute.
 *
 * @param {string} name
 * @param {HTMLElement} el
 * @return {string} Parsed JSON value or object
 * @private
 */
const _getData = (name, el) => _getAttribute('data-' + name, el)

/**
 * Get data attribute.
 *
 * This is a curried function
 *
 * @param {string} name
 * @param {HTMLElement} el
 * @return {string}
 */
const getData = curry(_getData)

const setData = curry((name, value, el) =>
	setAttribute('data-' + name, value, el)
)

/**
 * Attach event handler for a single event
 *
 * @param {string} event
 * @param {Function} handler
 * @param {Object} capture
 * @param {HTMLElement} el
 * @returns {HTMLElement}
 * @private
 */
const _on = (event, handler, capture, el) => {
	el.addEventListener(event, handler, capture, el)
	return el
}

const matches = (selector, el) =>
	(
		Element.prototype.matches ||
		Element.prototype.matchesSelector ||
		Element.prototype.mozMatchesSelector ||
		Element.prototype.msMatchesSelector ||
		Element.prototype.oMatchesSelector ||
		Element.prototype.webkitMatchesSelector
	).apply(el, [selector])

/**
 * Attach event handler for a list of events.
 *
 * This is a curried function
 *
 * @param {Array|Object} els Array or array-like object
 * @param {string} event
 * @param {Function} handler
 * @return {Array<HTMLElement>}
 */
const on = curry((event, handler, els) =>
	map(partial(_on, event, handler, {}), els)
)

const onPassive = curry((event, handler, els) =>
	map(partial(_on, event, handler, { passive: true }), els)
)

/**
 * Check to see if document has loaded
 *
 * @return {boolean}
 * @private
 */
const _domLoaded = () =>
	document.attachEvent
		? document.readyState === 'complete'
		: document.readyState !== 'loading'

/**
 * Call function when document is ready
 *
 * @param {Function} f
 */
const ready = (f) => (_domLoaded() ? f() : on('DOMContentLoaded', f, document))

const closest = curry((selector, el) =>
	whileDo(
		(target) => target && !matches(selector, target) && target.parentNode,
		(target) => (target.parentNode === document ? null : target.parentNode),
		el.parentNode
	)
)

const _delegate = (event, handler, selector, el) =>
	_on(
		event,
		(e) => {
			const matchedElement = whileDo(
				(target) =>
					target &&
					target !== document &&
					!matches(selector, target) &&
					target.parentNode,
				(target) => target.parentNode,
				e.target
			)

			if (
				matchedElement !== document &&
				matches(selector, matchedElement)
			) {
				handler.apply(el, [e])
			}
		},
		{},
		el
	)

const delegate = curry((event, handler, selector, els) =>
	map(partial(_delegate, event, handler, selector), els)
)

const remove = (el) => el.parentNode.removeChild(el)

/**
 * Remove class from a list of elements. This is a curried function.
 *
 * @param {string} className
 * @param {Array<HTMLElement>} els
 * @return {Array<HTMLElement>} Same elements for chaining
 */
const removeClass = curry((className, els) =>
	map((el) => {
		el.classList.remove(className)
		return el
	}, els)
)

const toggleClass = curry((className, els) =>
	map((el) => {
		el.classList.toggle(className)
		return el
	}, els)
)

/**
 * Select one element matching a selector, which is also decendant of a parent element (defaults to document)
 * @param {string} selector
 * @param {HTMLElement|HTMLDocument=} parent
 * @return {HTMLElement}
 */
const select = (selector, parent = document) => parent.querySelector(selector)

/**
 * Select all elements matching a selector, which are also decendant of a parent element (defaults to document)
 * @param {string} selector
 * @param {HTMLElement|HTMLDocument=} parent
 * @return {Array<HTMLElement>}
 */
const selectAll = (selector, parent = document) =>
	makeArray(parent.querySelectorAll(selector))

const getChildren = pipe(
	getProp('children'),
	makeArray
)

const getParent = getProp('parentNode')

const getTopOffset = (el) => _getElementRect(el).top + getScrollTop()

const getTopPosition = getProp('offsetTop')

/**
 * Trigger reflows so that transition happens after DOM insertion
 */
const triggerReflow = (els) => {
	map(getProp('offsetHeight'), els)
	return els
}

const doesSupportObjectFit = () =>
	Object.keys(document.documentElement.style).reduce(
		(support, prop) => support || /object(?:-f|F)it$/.test(prop),
		false
	)

const trigger = (eventName, el) => {
	let event
	let data = {}
	if (typeof eventName === 'object') {
		data = eventName.data
		eventName = eventName.event
	}
	if (typeof window.CustomEvent === 'function') {
		event = new CustomEvent(eventName, { detail: data })
	} else {
		event = document.createEvent('CustomEvent')
		event.initCustomEvent(eventName, true, true, data)
	}
	el.dispatchEvent(event)
	return el
}

const createElement = (tag) => document.createElement(tag)

const createScriptTag = (src, async = true, defer = true) =>
	pipe(
		createElement,
		setProp('src', src),
		setProp('async', async),
		setProp('defer', defer)
	)('script')

const getModuleOptions = (moduleName, el, def = {}) =>
	parseOptions(getData(moduleName, el), def)

/**
 * Run method when element focused
 *
 * @param {element}
 * @param {function}
 * @return null
 */
const onFocus = (el, callback) => {
	el &&
		el.addEventListener('focusin', function (e) {
			try {
				callback(el)
			} catch (e) {
				console.warn(e)
			}
		})
}

/**
 * Run method when element unfocused
 *
 * @param {element}
 * @param {function}
 * @return null
 */
const onBlur = (el, callback) => {
	el &&
		el.addEventListener('focusout', function (e) {
			try {
				callback(el)
			} catch (e) {
				console.warn(e)
			}
		})
}

/**
 * Run method when escape key pressed
 *
 * @param {element}
 * @param {function}
 * @return null
 */
const onEscape = (el, callback) => {
	el.addEventListener('keyup', function (e) {
		let eventkey = false

		if (e.key !== undefined) {
			eventkey = e.key
		} else if (e.keyIdentifier !== undefined) {
			eventkey = e.keyIdentifier
		} else if (e.keyCode !== undefined) {
			eventkey = e.keyCode
		}

		if (eventkey === 'Escape' || eventkey === 'Esc' || eventkey === 27) {
			try {
				callback(el)
			} catch (e) {
				console.warn(e)
			}
		}
	})
}

/**
 * Run method when escape key pressed
 *
 * @param {element}
 * @param {function}
 * @return null
 */
const onEnter = (el, callback) => {
	el.addEventListener('keyup', function (e) {
		let eventkey = false

		if (e.key !== undefined) {
			eventkey = e.key
		} else if (e.keyIdentifier !== undefined) {
			eventkey = e.keyIdentifier
		} else if (e.keyCode !== undefined) {
			eventkey = e.keyCode
		}

		if (eventkey === '13') {
			try {
				callback(el)
			} catch (e) {
				console.warn(e)
			}
		}
	})
}

/**
 * We use <label> tags instead of input placeholders to better align with ADA standards
 * This function is used to toggle a class on label tags to control their visibilty
 *
 * @param {HTMLElement} e - The element fo which the label is being controlled
 * @param {String} parentSelector - The classname of the inputs parent conteiner to scope the event
 */
const toggleLabel = (e, parentSelector) => {
	const inputContainer = closest(parentSelector, e.target)

	if (
		(document.activeElement !== e.target && !e.target.value) ||
		(e.target.localName === 'select' && e.target.value === 'all')
	) {
		removeClass('hide-label', inputContainer)
	} else {
		addClass('hide-label', inputContainer)
	}
}

const clickOrTouchStart = () => {
	if ('ontouchstart' in document.documentElement) {
		return 'touchstart'
	} else {
		return 'click'
	}
}

const inViewPort = (el) => {
	const rect = el.getBoundingClientRect()
	const windowHeight =
		window.innerHeight || document.documentElement.clientHeight
	const windowWidth =
		window.innerWidth || document.documentElement.clientWidth

	const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0
	const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0

	return vertInView && horInView
}

const getNoScriptContent = (el) => {
	if (!el) {
		return ''
	}

	const contextEls = el.getElementsByTagName('noscript')
	return contextEls && contextEls.length
		? contextEls[0].textContent || contextEls[0].innerHTML
		: ''
}

const loadNoscriptContent = (el, className = 'is-not-loaded') => {
	if (hasClass(className, el)) {
		const context = getNoScriptContent(el)

		if (context) {
			el.innerHTML = ''
			appendHtml(el, context)

			removeClass(className, el)
		}
	}
}

const loadImage = (itemEl, className = 'is-not-loaded') => {
	if (hasClass(className, itemEl)) {
		const contextEls = itemEl.getElementsByTagName('noscript')
		if (contextEls && contextEls.length) {
			const context = contextEls[0].textContent || contextEls[0].innerHTML

			itemEl.innerHTML = ''
			appendHtml(itemEl, context)

			removeClass(className, itemEl)
		}
	}
}

const htmlDecode = (input) => {
	const doc = new DOMParser().parseFromString(input, 'text/html')
	return doc.documentElement.textContent
}

const fallbackCopyTextToClipboard = (text) => {
	var textArea = document.createElement('textarea')
	textArea.value = text

	// Avoid scrolling to bottom
	textArea.style.top = '0'
	textArea.style.left = '0'
	textArea.style.position = 'fixed'

	document.body.appendChild(textArea)
	textArea.focus()
	textArea.select()

	try {
		var successful = document.execCommand('copy')
		var msg = successful ? 'successful' : 'unsuccessful'
		// console.log('Copying text command was ' + msg)
	} catch (error) {
		// console.log(error)
	}

	document.body.removeChild(textArea)
}

const copyTextToClipboard = (text) => {
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(text)
		return
	}
	navigator.clipboard.writeText(text).then(
		function () {
			// console.log('Copying to clipboard was successful!')
		},
		function (error) {
			// console.log(error)
		}
	)
}

const removeVietnameseTones = (str) => {
	str = str.replace(
		/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g,
		'a'
	)
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'e')
	str = str.replace(/ì|í|ị|ỉ|ĩ|Ì|Í|Ị|Ỉ|Ĩ/g, 'i')
	str = str.replace(
		/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g,
		'o'
	)
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'u')
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ|Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'y')
	str = str.replace(/đ|Đ/g, 'd')
	// Some system encode vietnamese combining accent as individual utf-8 characters
	// Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
	str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
	str = str.replace(/\u02C6|\u0306|\u031B/g, '') // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
	// Remove extra spaces
	// Bỏ các khoảng trắng liền nhau
	str = str.replace(/ + /g, ' ')
	str = str.trim()
	// Remove punctuations
	// Bỏ dấu câu, kí tự đặc biệt
	str = str.replace(
		/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
		' '
	)
	return str.toLowerCase().replace(/ /g, '-')
}

export {
	addClass,
	append,
	appendHtml,
	appendNode,
	clickOrTouchStart,
	createElement,
	createNodes,
	closest,
	copyTextToClipboard,
	delegate,
	doesSupportObjectFit,
	getAttribute,
	getChildren,
	getHeight,
	getTopOffset,
	getTopPosition,
	getData,
	getModuleOptions,
	getNoScriptContent,
	getParent,
	getScrollTop,
	getStyle,
	hasClass,
	hide,
	htmlDecode,
	inViewPort,
	on,
	onEscape,
	onEnter,
	onPassive,
	onFocus,
	onBlur,
	loadImage,
	loadNoscriptContent,
	matches,
	prepend,
	preventDefault,
	ready,
	remove,
	removeClass,
	select,
	selectAll,
	setAttribute,
	setData,
	setHeight,
	setStyle,
	toggleClass,
	toggleLabel,
	triggerReflow,
	trigger,
	removeVietnameseTones
}
