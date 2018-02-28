import Base from './base'

class BufferView extends Base {
  /**
   * [constructor description]
   * @param  {[array]} virtualDOM an array of the dom
   *                              objects you would like to
   *
   * @param  {[const]} size How many dom elements the buffer should contain
   *
   * @return {[BufferView]}
   */
  constructor(virtualDOM, size) {
		super()
    this._virtualDOM = virtualDOM
		this._size = size
		this._startIndex = 0
		// track the top and bottom of the view in pixels so we can update
		this._viewTop = 0
		this._viewBottom = 0

		this._view = this._virtualDOM.map(this._startIndex, this._size)
																 .map((val) => new Line(val))
																 .map(this.appendVChild)


		this._el.addEventListener("wheel", this._scroll, {passive: true})
  }

	appendVChild(child) {
		let fragment = document.createDocumentFragment()
		const childDOM = child.render()
		fragment.appendChild(childDOM)
		// this._viewBottom += childDOM.offsetTop
		// optimization for quicker rendering
		this._el.appendChild(fragment)
	}

	_scroll(e) {
		if((e.deltaY+this._viewTop) < this._viewTop)
			this._up()
		else if(e.deltaY+this._viewBottom > this._viewBottom)
			this._down()
		this._viewBottom += e.deltaY, this._viewTop += e.deltaY
	}

	_up() {

	}

	_down() {

	}

	render() {
		return this._el
	}

}
