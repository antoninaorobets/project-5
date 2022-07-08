class User < ApplicationRecord
    has_many :lists
    has_many :books, through: :lists
    has_secure_password

    validates :name, presence: :true
    validates :email, email: :true, presence: true, uniqueness: true
end
