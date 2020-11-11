import nav from '../../data'
import { Component } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { BACKGROUND_LINEAR, TONGJI_URL } from '../../config'
import { randomInt } from '../utils'

@Component({
  selector: 'app-xiejiahe',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nav: Array<any> = nav

  constructor (private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const hash = window.location.hash
    const params = new URLSearchParams(hash.slice(hash.indexOf('?')))
    const page = params.get('page')
    const id = params.get('id')
    const q = params.get('q')
    const queryParams = { page, id, q }

    this.goRoute(queryParams)
    this.appendTongji()
  }

  ngAfterViewInit() {
    setInterval(this.setBackground, 10000)
  }

  goRoute(queryParams: object) {
    const screenWidth = window.innerWidth

    if (screenWidth < 768) {
      this.router.navigate(['/app'], { queryParams })
    } else {
      this.router.navigate(['/index'], { queryParams })
    }
  }

  setBackground() {
    const randomBg = BACKGROUND_LINEAR[randomInt(BACKGROUND_LINEAR.length)]
    const el = document.getElementById('index-background')
    if (!el) return
    el.style.opacity = '.3'
    setTimeout(() => {
      el.style.backgroundImage = randomBg
      el.style.opacity = '1'
    }, 1000)
  }

  appendTongji() {
    if (document.getElementById('tongji_url')) return

    const script = document.createElement('script')
    script.src = TONGJI_URL
    script.id = 'tongji_url'
    script.async = true
    document.documentElement.appendChild(script)
  }
}