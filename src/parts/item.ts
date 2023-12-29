import { Vector2, Vector3 } from "three";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Conf } from "../core/conf";
import { Func } from "../core/func";
import { Util } from "../libs/util";
import { DoubleEase } from "../libs/doubleEase";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  private _itemId: number = 0
  private _items: Array<HTMLInputElement> = []
  private _itemsCheck: Array<DoubleEase> = []
  private _isChecked: boolean = false
  private _useKey: Array<number> = []
  private _t:number = 0.8
  private _it: number = 0.04

  constructor(opt:any) {
    super(opt)

    this._itemId = opt.itemId

    const num = 1
    for (let i = 0; i < num; i++) {
      const el = document.createElement('input') as HTMLInputElement
      el.classList.add('js-item-input')
      el.type = 'range'
      this.el.appendChild(el)
      this._items.push(el)

      this._itemsCheck.push(new DoubleEase())

      this._useKey.push(i)
    }
    // Util.shuffle(this._useKey)

    this._resize()
  }

  public show():void {
    if(this._isChecked) return
    this._isChecked = true

    this._itemsCheck.forEach((item, i) => {

      item.start({
        d: 0.75,
        t: this._t,
        a: 3,
        ease: Tween.ExpoEaseOut,
        delay: i * this._it,
      })

    })
  }

  public hide():void {
    if(!this._isChecked) return
    this._isChecked = false

    this._itemsCheck.forEach((item, i) => {

      item.end({
        d: 0.3,
        t: this._t,
        a: 2,
        ease: Tween.ExpoEaseOut,
        delay: i * this._it,
      })

    })
  }

  protected _update():void {
    super._update()


    this._items.forEach((item, i) => {
      const key = this._useKey[i]
      const val = this._itemsCheck[key].val

      if(val > 0 && val < 0.99) item.value = Util.map(val, 0, 100, 0, 0.98).toFixed(0)

      const o = Util.map(val, 0.1, 1, 0, 0.5)
      Tween.set(item, {
        opacity: o,
      })
    })
  }

  protected  _resize(): void {
    super._resize()

    let lineSize = Conf.LINE_SIZE.height * Func.val(0.7, 1)
    let inputSize = Conf.LINE_SIZE.width
    const center = new Vector2(
      lineSize * 0.5,
      lineSize * 1,
    )

    const kake = 0.875
    this._items.forEach((item) => {
      Tween.set(item, {
        width: lineSize * kake,
        height: inputSize * kake,
      })
    })

    const item = {
      rotation: new Vector3(),
      position: new Vector3(),
    }

    const i = this._itemId

    if(i === 0 || i === 3 || i === 6) {
      lineSize -= inputSize * 1
    }

    if(i === 0) {
      item.rotation.z = 90
      item.position.x = -inputSize * 0.5
      item.position.y = lineSize + inputSize * 1
    }

    if(i === 1) {
      item.rotation.z = 0
      item.position.x = lineSize * 0.5
      item.position.y = lineSize * 0.5
    }

    if(i === 2) {
      item.rotation.z = 0
      item.position.x = -lineSize * 0.5
      item.position.y = lineSize * 0.5
    }

    if(i === 3) {
      item.rotation.z = 90
      item.position.x = lineSize * 0 - inputSize * 0.5
      item.position.y = lineSize * 0 + inputSize * 0.5
    }

    if(i === 4) {
      item.rotation.z = 0
      item.position.x = lineSize * 0.5
      item.position.y = lineSize * -0.5
    }

    if(i === 5) {
      item.rotation.z = 0
      item.position.x = -lineSize * 0.5
      item.position.y = lineSize * -0.5
    }

    if(i === 6) {
      item.rotation.z = 90
      item.position.x = lineSize * 0 - inputSize * 0.5
      item.position.y = lineSize * -1 - inputSize * 0
    }

    Tween.set(this.el, {
      rotationZ: 90 - item.rotation.z,
      x: center.x + item.position.x - inputSize * 0.5,
      y: center.y + item.position.y * -1 + inputSize * 0,
      height: lineSize,
      width: inputSize,
    })
  }
}







