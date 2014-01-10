NewReader::Application.routes.draw do
  resources :feeds, only: [:index, :create, :show] do
    resources :entries, only: [:index]
  end

  resources :entries, only: [:show]

  resources :users, only: [:create]
  resource :session, only: [:create, :destroy]

  root to: "feeds#index"
end
