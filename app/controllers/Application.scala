package controllers

import play.api._
import play.api.mvc._
import models.Player

object Application extends Controller {

  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  def chartJS = Action {
    Ok(views.js.chart(10, Player.getAllPlayers))
  }

  def avatar(name: String) = Action {
    Redirect(s"/assets/avatars/${Player.getAvatarByPlayerName(name)}")
  }
}