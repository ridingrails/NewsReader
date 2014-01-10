class FeedsController < ApplicationController
  def index
    feeds = Feed.all
    feeds.each do |feed|
      feed.reload if feed.updated_at > 2.seconds.ago
    end

    respond_to do |format|
      format.html { render :index }
      # format.json { render :json => Feed.all, :include => :entries }
      format.json { render :json => Feed.all }
    end
  end

  def show
    feed = Feed.find(params[:id])
    feed.reload if feed.updated_at > 2.seconds.ago
    render :json => feed, :include => :entries
  end

  def create
    feed = Feed.find_or_create_by_url(params[:feed][:url])
    if feed
      render :json => feed
    else
      render :json => { error: "invalid url" }, status: :unprocessable_entity
    end
  end
end
