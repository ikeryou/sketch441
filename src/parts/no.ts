import { Conf } from "../core/conf";
import { Func } from "../core/func";
import { MyDisplay } from "../core/myDisplay";
import { Param } from "../core/param";
import { Tween } from "../core/tween";
import { Item } from "./item";

// -----------------------------------------
//
// -----------------------------------------
export class No extends MyDisplay {

  private _noId: number = 0
  private _item: Array<Item> = []

  private _changeCnt: number = 0
  private _now: number = 1
  private _table: Array<any> = [
    [1,1,1,0,1,1,1,],
    [0,1,0,0,1,0,0,],
    [1,1,0,1,0,1,1,],
    [1,1,0,1,1,0,1,],
    [0,1,1,1,1,0,0,],
    [1,0,1,1,1,0,1,],
    [1,0,1,1,1,1,1,],
    [1,1,1,0,1,0,0,],
    [1,1,1,1,1,1,1,],
    [1,1,1,1,1,0,1,],
  ]

  constructor(opt:any) {
    super(opt)

    this._noId = opt.noId

    const num = this._table[0].length
    for (let i = 0; i < num; i++) {
      const el = document.createElement('div')
      this.el.appendChild(el)
      el.classList.add('js-item')
      const item = new Item({
        el: el,
        itemId: i,
      })
      this._item.push(item)
    }
  }

  public setNo(no: number):void {
    if(this._now != no) {
      this._now = no
      this._changeCnt++
      if(this._noId === 5 && this._changeCnt % 4 === 0) {
        Param.instance.allChangeCnt++
      }
    }
  }

  protected _update():void {
    super._update()

    let lineSize = Conf.LINE_SIZE.height
    Tween.set(this.el, {
      width: lineSize * Func.val(0.7, 1),
      height: lineSize * 2 * Func.val(0.7, 1)
    })

    const table = this._table[this._now]
    const test = Param.instance.allChangeCnt % 2 === 0 ? 1 : 0
    this._item.forEach((item, i) => {
      if(table[i] === test) {
        item.show()
      } else {
        item.hide()
      }
    })
  }
}