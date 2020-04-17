# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  balance         :float            default("5000.0")
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  username        :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_balance        (balance)
#  index_users_on_email          (email) UNIQUE
#  index_users_on_session_token  (session_token) UNIQUE
#  index_users_on_username       (username) UNIQUE
#
class User < ApplicationRecord
    validates :username, :session_token, presence: true, uniqueness: true
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
    validates :email, presence: true, format: {with: VALID_EMAIL_REGEX}, uniqueness: {case_sensitive: false}
    validates :password, length: {minimum: 6}, allow_nil: true
    validates :balance, presence: true

    has_many :transactions,
    class_name: :Transaction,
    foreign_key: :user_id

    has_many :stocks,
    class_name: :Stock,
    foreign_key: :user_id

    after_initialize :ensure_session_token
    attr_reader :password

    def self.find_by_email(email)
        user = User.find_by(email: email)
    end

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        return user if user && user.is_valid?(password)
        nil
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_valid?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token! 
        self.update!(session_token: User.generate_session_token)
        self.session_token
    end

    private
    def self.generate_session_token
        SecureRandom.urlsafe_base64
    end

    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end
end
