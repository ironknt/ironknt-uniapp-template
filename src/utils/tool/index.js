export const parseTime = function (time) {
	let tempDate = new Date(time)
	return `${tempDate.getFullYear()}年${tempDate.getMonth() + 1}月${tempDate.getDate()}日${tempDate.getHours()}时`
}

export const debounce = function (func, wait, immediate) {
	let timeout, args, context, timestamp, result

	let later = function() {
		let last = new Date().getTime() - timestamp
		if (last < wait && last >= 0) {
			timeout = setTimeout(later, wait - last)
		} else {
			timeout = null
			if (!immediate) {
				result = func.apply(context, args)
				if (!timeout) context = args = null
			}
		}
	}

	return function() {
		context = this
		args = arguments
		timestamp = new Date().getTime()
		let callNow = immediate && !timeout
		if (!timeout) timeout = setTimeout(later, wait)
		if (callNow) {
			result = func.apply(context, args)
			context = args = null
		}
		return result
	}
}

export const showToast = function (title, duration = 2000, isSuccess = false) {
	let r = title
	if (typeof (title) !== 'string') {
		r = title && (title.message || title.response)
	}
	if (!isSuccess) {
		uni.showModal({
			title: '提示',
			content: r,
			showCancel: false
		});
	} else {
		uni.showToast({
			duration: duration,
			title: r,
			icon: 'none'
		})
	}
}

export const braceCatch = function (callback) {
	return function() {
		let context = this
		let args = arguments
		try {
			let result = callback.apply(context, args)
			context = args = null
			return result
		} catch (err) {
			showToast(err && err.message)
		}
	}
}

export default {
	parseTime,
	debounce,
	showToast
}