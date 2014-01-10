class User < ActiveRecord::Base
  attr_accessible :username, :password

  before_validation :set_session_token

  validates_presence_of :username, :password, :session_token

  def self.find_by_credentials(options)
    User.find_by_username_and_password(options[:username], options[:password])
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def set_session_token
    self.session_token = User.generate_session_token
  end

  def reset_session_token!
    self.set_session_token
    save!
  end
end
