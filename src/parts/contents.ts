import { Func } from "../core/func";
import { MyDisplay } from "../core/myDisplay";
import { Util } from "../libs/util";
import { No } from "./no";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _no: Array<No> = []

  constructor(opt:any) {
    super(opt)

    const num = 6
    for (let i = 0; i < num; i++) {
      const el = document.createElement('div')
      this.el.appendChild(el)
      el.classList.add('js-no')
      const no = new No({
        el: el,
        noId: i,
      })
      this._no.push(no)
    }
  }

  protected _update():void {
    super._update()

    // 現時刻を取得
    const d = new Date()
    const h = Util.numStr(Number(d.getHours().toFixed(0)), 2)
    const m = Util.numStr(Number(d.getMinutes().toFixed(0)), 2)
    const s = Util.numStr(Number(d.getSeconds().toFixed(0)), 2)

    // 一と桁ずつ割り当てる
    this._no.forEach((item, i) => {
      if(i == 0 || i == 1) {
        item.setNo(Number(h.charAt(i)))
        item.el.style.display = Func.isXS() ? 'none' : ''
      } else if(i == 2 || i == 3) {
        item.setNo(Number(m.charAt(i - 2)))
        item.el.style.display = Func.isXS() ? 'none' : ''
      } else {
        item.setNo(Number(s.charAt(i - 4)))
      }
    })
  }
}