﻿# == Schema Information
#
# Table name: signatures
#
#  id                             :integer         not null, primary key
#  proposal_id                    :integer
#  email                          :string(255)
#  state                          :integer
#  token                          :string(255)
#  tractis_contract_location      :string(255)
#  name                           :string(255)
#  dni                            :string(255)
#  surname                        :string(255)
#  terms                          :boolean
#  created_at                     :datetime
#  updated_at                     :datetime
#  province_id                    :integer
#  municipality_id                :integer
#  address                        :string(255)
#  zipcode                        :string(255)
#  date_of_birth                  :date
#  province_of_birth_id           :integer
#  municipality_of_birth_id       :integer
#  type                           :string(255)
#  surname2                       :string(255)
#  tractis_signature_file_name    :string(255)
#  tractis_signature_content_type :string(255)
#  tractis_signature_file_size    :integer
#  tractis_signature_updated_at   :datetime
#

require 'test_helper'

class SignatureTest < ActiveSupport::TestCase
  # Replace this with your real tests.
  test "signatures of the same proposal must not have same dni" do
    signature = IlpSignature.new(:email => signatures(:firma_javier).email,
															:state => 1,
															:token => 2345,
															:tractis_contract_location => 6543,
															:name => 'Juanito',
															:dni => signatures(:firma_javier).email,
															:surname => 'Gómez',
															:proposal => proposals(:ilp))
		assert !signature.save
  end
end
