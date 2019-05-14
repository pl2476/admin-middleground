const eventProxy = {
  onObj: {},
  oneObj: {},
  on(key, fn) {
    if (this.onObj[key] === undefined) {
      this.onObj[key] = [];
    }

    this.onObj[key].push(fn);
  },
  one(key, fn) {
    if (this.oneObj[key] === undefined) {
      this.oneObj[key] = [];
    }

    this.oneObj[key].push(fn);
  },
  off(key) {
    this.onObj[key] = [];
    this.oneObj[key] = [];
  },
  trigger(...arg) {
    if (arg.length === 0) {
      return false;
    }
    const key = arg[0];
    const args = [].concat(Array.prototype.slice.call(arg, 1));

    if (this.onObj[key] !== undefined && this.onObj[key].length > 0) {
      // for (const i in this.onObj[key]) {
      // 	this.onObj[key][i].apply(null, args);
      // }
      this.onObj[key].values.forEach(element => {
        element.apply(null, ...args);
      });
    }
    if (this.oneObj[key] !== undefined && this.oneObj[key].length > 0) {
      // for (let i in this.oneObj[key]) {
      //   this.oneObj[key][i].apply(null, args);
      //   this.oneObj[key][i] = undefined;
      // }
      for (let index = 0; index < this.oneObj[key].keys.length; index += 1) {
        let element = this.oneObj[key][index];
        element.apply(null, ...args);
        element = undefined;
      }
      this.oneObj[key] = [];
    }
    return null;
  },
};

export default eventProxy;
