import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { UserSession } from './models/userSession'

@Injectable()
export class StoreService {

  _userSession = new Subject<UserSession>()
  userSession = this._userSession.asObservable()
  setCurrentSession(data) {
    this._userSession.next(data)
  }

  _firstStep = new Subject<any>()
  firstStep = this._firstStep.asObservable()
  setFistStepData(data) {
    this._firstStep.next(data)
  }

  _secondStep = new Subject<any>()
  secondStep = this._secondStep.asObservable()
  setSecondStepData(data) {
    this._secondStep.next(data)
  }

  _thidStep = new Subject<any>()
  thirdStep = this._thidStep.asObservable()
  setThirdStepData(data) {
    this._thidStep.next(data)
  }
}
