class ReportMailer < ActionMailer::Base
  default :from => AppConfig.mail.sender_address

  def new_report(type, id)
    url = AppConfig.pod_uri.to_s
    url << report_index_path
    resource = Hash[
      :subject => I18n.t('notifier.report_email.subject', :type => type),
      :url => url,
      :type => type,
      :id => id
    ]
    Role.admins.each do |role|
      resource[:email] = User.find_by_id(role.person_id).email
      format(resource).deliver
    end
  end

  private
    def format(resource)
      mail(to: resource[:email], subject: resource[:subject]) do |format|
        format.html { render 'report/report_email', :locals => { :resource => resource } }
        format.text { render 'report/report_email', :locals => { :resource => resource } }
      end
    end
end
