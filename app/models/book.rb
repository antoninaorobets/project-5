class Book < ApplicationRecord
  belongs_to :list

  validates :title, presence: :true
  validates :author, presence: :true
end
