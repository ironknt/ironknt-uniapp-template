function parseTime(time) {
  const tempDate = new Date(time);
  return `${tempDate.getFullYear()}年${tempDate.getMonth() + 1}月${tempDate.getDate()}日${tempDate.getHours()}时`;
}

function debounce(func, wait, immediate) {
  let timeout;
  let args;
  let context;
  let timestamp;
  let result;

  const later = () => {
    const last = new Date().getTime() - timestamp;
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function test(...as) {
    context = this;
    args = as;
    timestamp = new Date().getTime();
    const callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
}

function showToast(title, duration = 2000, isSuccess = false) {
  let r = title;
  if (typeof (title) !== 'string') {
    r = title && (title.message || title.response);
  }
  if (!isSuccess) {
    uni.showModal({
      title: '提示',
      content: r,
      showCancel: false,
    });
  } else {
    uni.showToast({
      duration,
      title: r,
      icon: 'none',
    });
  }
}

function braceCatch(callback) {
  return function test(...as) {
    let context = this;
    let args = as;
    try {
      const result = callback.apply(context, args);
      context = args = null;
      return result;
    } catch (err) {
      showToast(err && err.message);
    }
    return false;
  };
}

export default {
  parseTime,
  debounce,
  braceCatch,
  showToast,
};
