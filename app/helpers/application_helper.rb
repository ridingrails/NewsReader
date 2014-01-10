module ApplicationHelper
  def logged_in?
    !!current_user
  end

  def current_user
    return nil unless session[:session_token]
    @current_user || User.find_by_session_token(session[:session_token])
  end

  def login!(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
    @current_user = user
  end

  def logout!
    user.reset_session_token!
    session[:session_token] = nil
  end
end
