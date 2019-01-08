class PagesController < ApplicationController
  def index
  	@messages = Message.all
  end
end
