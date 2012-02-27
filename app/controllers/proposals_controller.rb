﻿class ProposalsController < ApplicationController
	#caches_page :index
  before_filter :authenticate, :only => [:edit]
	before_filter :correct_user, :only => [:edit]
	
  # GET /proposals
  # GET /proposals.xml
  def index
    @proposals = IlpProposal.on_signature_time
		if @proposals.empty? then	
			raise 'No proposals'
		end
		
		@proposal = @proposals.first
		@provinces = Province.order("name").where("only_circunscription = ?", false)
		@signature = @proposal.ilp_signatures.new(params[:signature])

    share_texts(@proposals.first)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @proposals }
    end
  end

  # GET /proposals/1
  # GET /proposals/1.xml
  def show
    @proposal = IlpProposal.find(params[:id])
		@provinces = Province.order("name").where("only_circunscription = ?", false)
		@signature = @proposal.ilp_signatures.new(params[:signature])
		@title = @proposal.problem
		
    share_texts(@proposal)
		
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @proposal }
    end
  end

	private

    def authenticate
      deny_access unless signed_in?
    end
		
		def correct_user
			@proposal = IlpProposal.find(params[:id])
			@user = @proposal.user
			redirect_to(root_path) unless current_user?(@user)
		end	
	
end
