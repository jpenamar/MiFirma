﻿require 'tractis_api'

class SignaturesController < ApplicationController
	
  def create
    @signature = IlpSignature.new params[:ilp_signature]
		
    if @signature.valid?
      tractis_signature_request = ::TractisApi.signature_request_ilp @signature
      @signature.update_attribute :tractis_contract_location, tractis_signature_request[:location]
      if @signature.tractis_contract_location
        redirect_to @signature.tractis_contract_location
      else
        flash[:error] = "Error de comunicación con Tractis, por favor vuelva a intentarlo."
				logger.debug 'Error de comunicación con Tractis'
				@signature.destroy
				redirect_to proposal_url(@signature.proposal, :signature => params[:ilp_signature])
      end
    else
      flash[:error] = @signature.errors.map {|a,m| "#{m.capitalize}"}.uniq.join("<br/>\n")
      redirect_to proposal_url(@signature.ilp_proposal, :signature => params[:ilp_signature])
    end
  end
  
  def show
		logger.debug 'Estamos dentro del metodo show en Signatures'
    @signature = Signature.find_by_token params[:id]
    @proposal = @signature.proposal
    @signature.check_and_get_tractis_signature
    share_texts(@proposal, @signature)    
		
		if not @signature.valid?
      flash[:error] = @signature.errors.map {|a,m| "#{m.capitalize}"}.uniq.join("<br/>\n")
		else
			if @signature.class.name == 'IlpSignature'
				Notifier.ilp_signed(@signature).deliver
			else 
				if @signature.class.name == 'EndorsmentSignature'
					Notifier.endorsment_signed(@signature).deliver
				end
			end
		end
  end
  
  def share
    @signature = Signature.find_by_token params[:id]
    @proposal = @signature.proposal
    share_texts(@proposal, @signature)    
    render :layout => false
  end
  
end