package controllers

import play.api._
import play.api.mvc._
import models.Player

object Application extends Controller {

  def index = Action {
    Ok(views.html.index(None))
  }

  def chartJS = Action {
    Ok(views.js.chart(5, Player.getAllPlayers))
  }

  def avatar(name: String) = Assets.at("/public/avatars", Player.getAvatarByPlayerName(name))
}