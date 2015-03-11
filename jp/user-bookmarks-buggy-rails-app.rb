# The following is the selected guts from a trivial Rails app that lets users manage
# bookmarks.  Database migrations, models, routes, and controllers are shown, and all
# other Rails stuff is suppressed.  Assume that each class is in its own file in the
# appropriate location (referenced in the comments above it).  This trivial app has a
# number of issues.
#
# INSTRUCTIONS: Just by reading the code below, your task is to enumerate as many
# syntax / design / implementation issues as you can find, and where appropriate to
# recommend changes.

##### MIGRATIONS (app/db/migrations/{create_user.rb, create_bookmarks.rb}) #####

class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: :false
    end
  end
end

class CreateBookmarks < ActiveRecord::Migration
  def change
    create_table :bookmarks do |t|
      t.string :url, null: :false
      t.boolean :is_public, null: :false
    end
  end
end

##### MODELS (app/models/{user.rb, bookmark.rb}) #####

class User < ActiveRecord::Base
  # A user owns a bunch of bookmarks
  has_many :bookmarks
  validates :username, uniqueness: true
end

class Bookmark < ActiveRecord::Base
  belongs_to :user
  validates :url, uniqueness: {scope: :user_id}
end

##### ROUTES (app/config/routes.rb) #####

Rails.application.routes.draw do
  resources :users, only: [:show, :update, :destroy] do
    resources :bookmarks, shallow: true
  end

  get 'users/:to_user_id/bookmarks/copy/:from_user_id', to: 'bookmarks#copy'
end

##### CONTROLLERS (app/controllers/{users_controller.rb, bookmarks_controller.rb}) ######

class UsersController < ActionController::Base
  # Lets a user see their info
  def show
    @user = User.find(params[:id])
    respond_with @user
  end

  # Lets a user update their info
  def update
    @user = User.find(params[:id])
    @user.update_attributes(params[:user])
    respond_with @user
  end

  # Lets a user delete their account
  def destroy
    @user = User.find(params[:id])
    @user.destroy
    respond_with @user
  end
end

class BookmarksController < ActionController::Base
  # Copies all public bookmarks from one user to another
  def copy
    from_user = User.where("id = '#{params[:id]}'")
    from_user.bookmarks.each do |bookmark|
      next if !bookmark.is_public
      to_user.bookmarks << bookmark
    end

    respond_to do |format|
      format.json { :success }
    end
  end
end
