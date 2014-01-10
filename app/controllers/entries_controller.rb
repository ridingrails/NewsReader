class EntriesController < ApplicationController
  def index
    feed = Feed.find(params[:feed_id])
    render :json => feed.entries
  end

  def show
    entry = Entry.find(params[:id])
    render :json => entry
  end
end
