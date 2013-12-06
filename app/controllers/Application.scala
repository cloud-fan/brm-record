package controllers

import play.api._
import play.api.mvc._
import scala.collection.immutable.ListMap

object Application extends Controller {

  var data = ListMap("屌伦" -> 1, "曹伟" -> 1, "高峰" -> -4, "蛋总" -> 1, "渣臣" -> 1)

  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  def chartJS = Action {
    Ok(views.js.chart(10, data))
  }

}