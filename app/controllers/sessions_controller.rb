class SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(params[:user])
    if @user
      login! @user
      render :json => @user
    else
      render :json => ["invalid username or password"], :status => :unprocessable_entity
    end
  end

  def destroy
    logout!
    render :json => ["logged out successfully"]
  end
end


