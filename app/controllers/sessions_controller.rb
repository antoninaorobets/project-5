class SessionsController < ApplicationController
    # wrap_parameters format: []
    def create
        user = User.find_by(email: params[:email])
       
        if user && user.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {errors:  "Invalid username or password"}, status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
        render json: {}
    end
end
