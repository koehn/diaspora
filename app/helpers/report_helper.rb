#   Copyright (c) 2012, Diaspora Inc.  This file is
#   licensed under the Affero General Public License version 3 or later.  See
#   the COPYRIGHT file.

module ReportHelper
  def report_content(id, type)
    if type.eql? "post"
      raw t('report.post_label', title: link_to(post_page_title(Post.find_by_id(id)), post_path(id)))
    elsif type.eql? "comment"
      raw t('report.comment_label', data: comment_message(Comment.find_by_id(id)))
    end
  end
end
