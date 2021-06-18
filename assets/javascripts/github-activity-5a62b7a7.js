/*! github-activity-feed - v0.1.7 - Copyright 2015 Casey Scarborough */
function millisecondsToStr(e){"use strict";function t(e){return e>1?"s ago":" ago"}var r=Math.floor(e/1e3),i=Math.floor(r/31536e3);if(i)return i+" year"+t(i);var n=Math.floor((r%=31536e3)/2592e3);if(n)return n+" month"+t(n);var a=Math.floor((r%=2592e3)/86400);if(a)return a+" day"+t(a);var s=Math.floor((r%=86400)/3600);if(s)return"about "+s+" hour"+t(s);var o=Math.floor((r%=3600)/60);if(o)return o+" minute"+t(o);var l=r%60;return l?l+" second"+t(l):"just now"}function pluralize(e,t){return 1!==t?e+"s":e}function md5cycle(e,t){var r=e[0],i=e[1],n=e[2],a=e[3];r=ff(r,i,n,a,t[0],7,-680876936),a=ff(a,r,i,n,t[1],12,-389564586),n=ff(n,a,r,i,t[2],17,606105819),i=ff(i,n,a,r,t[3],22,-1044525330),r=ff(r,i,n,a,t[4],7,-176418897),a=ff(a,r,i,n,t[5],12,1200080426),n=ff(n,a,r,i,t[6],17,-1473231341),i=ff(i,n,a,r,t[7],22,-45705983),r=ff(r,i,n,a,t[8],7,1770035416),a=ff(a,r,i,n,t[9],12,-1958414417),n=ff(n,a,r,i,t[10],17,-42063),i=ff(i,n,a,r,t[11],22,-1990404162),r=ff(r,i,n,a,t[12],7,1804603682),a=ff(a,r,i,n,t[13],12,-40341101),n=ff(n,a,r,i,t[14],17,-1502002290),i=ff(i,n,a,r,t[15],22,1236535329),r=gg(r,i,n,a,t[1],5,-165796510),a=gg(a,r,i,n,t[6],9,-1069501632),n=gg(n,a,r,i,t[11],14,643717713),i=gg(i,n,a,r,t[0],20,-373897302),r=gg(r,i,n,a,t[5],5,-701558691),a=gg(a,r,i,n,t[10],9,38016083),n=gg(n,a,r,i,t[15],14,-660478335),i=gg(i,n,a,r,t[4],20,-405537848),r=gg(r,i,n,a,t[9],5,568446438),a=gg(a,r,i,n,t[14],9,-1019803690),n=gg(n,a,r,i,t[3],14,-187363961),i=gg(i,n,a,r,t[8],20,1163531501),r=gg(r,i,n,a,t[13],5,-1444681467),a=gg(a,r,i,n,t[2],9,-51403784),n=gg(n,a,r,i,t[7],14,1735328473),i=gg(i,n,a,r,t[12],20,-1926607734),r=hh(r,i,n,a,t[5],4,-378558),a=hh(a,r,i,n,t[8],11,-2022574463),n=hh(n,a,r,i,t[11],16,1839030562),i=hh(i,n,a,r,t[14],23,-35309556),r=hh(r,i,n,a,t[1],4,-1530992060),a=hh(a,r,i,n,t[4],11,1272893353),n=hh(n,a,r,i,t[7],16,-155497632),i=hh(i,n,a,r,t[10],23,-1094730640),r=hh(r,i,n,a,t[13],4,681279174),a=hh(a,r,i,n,t[0],11,-358537222),n=hh(n,a,r,i,t[3],16,-722521979),i=hh(i,n,a,r,t[6],23,76029189),r=hh(r,i,n,a,t[9],4,-640364487),a=hh(a,r,i,n,t[12],11,-421815835),n=hh(n,a,r,i,t[15],16,530742520),i=hh(i,n,a,r,t[2],23,-995338651),r=ii(r,i,n,a,t[0],6,-198630844),a=ii(a,r,i,n,t[7],10,1126891415),n=ii(n,a,r,i,t[14],15,-1416354905),i=ii(i,n,a,r,t[5],21,-57434055),r=ii(r,i,n,a,t[12],6,1700485571),a=ii(a,r,i,n,t[3],10,-1894986606),n=ii(n,a,r,i,t[10],15,-1051523),i=ii(i,n,a,r,t[1],21,-2054922799),r=ii(r,i,n,a,t[8],6,1873313359),a=ii(a,r,i,n,t[15],10,-30611744),n=ii(n,a,r,i,t[6],15,-1560198380),i=ii(i,n,a,r,t[13],21,1309151649),r=ii(r,i,n,a,t[4],6,-145523070),a=ii(a,r,i,n,t[11],10,-1120210379),n=ii(n,a,r,i,t[2],15,718787259),i=ii(i,n,a,r,t[9],21,-343485551),e[0]=add32(r,e[0]),e[1]=add32(i,e[1]),e[2]=add32(n,e[2]),e[3]=add32(a,e[3])}function cmn(e,t,r,i,n,a){return t=add32(add32(t,e),add32(i,a)),add32(t<<n|t>>>32-n,r)}function ff(e,t,r,i,n,a,s){return cmn(t&r|~t&i,e,t,n,a,s)}function gg(e,t,r,i,n,a,s){return cmn(t&i|r&~i,e,t,n,a,s)}function hh(e,t,r,i,n,a,s){return cmn(t^r^i,e,t,n,a,s)}function ii(e,t,r,i,n,a,s){return cmn(r^(t|~i),e,t,n,a,s)}function md51(e){txt="";var t,r=e.length,i=[1732584193,-271733879,-1732584194,271733878];for(t=64;t<=e.length;t+=64)md5cycle(i,md5blk(e.substring(t-64,t)));e=e.substring(t-64);var n=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(t=0;t<e.length;t++)n[t>>2]|=e.charCodeAt(t)<<(t%4<<3);if(n[t>>2]|=128<<(t%4<<3),t>55)for(md5cycle(i,n),t=0;16>t;t++)n[t]=0;return n[14]=8*r,md5cycle(i,n),i}function md5blk(e){var t,r=[];for(t=0;64>t;t+=4)r[t>>2]=e.charCodeAt(t)+(e.charCodeAt(t+1)<<8)+(e.charCodeAt(t+2)<<16)+(e.charCodeAt(t+3)<<24);return r}function rhex(e){for(var t="",r=0;4>r;r++)t+=hex_chr[e>>8*r+4&15]+hex_chr[e>>8*r&15];return t}function hex(e){for(var t=0;t<e.length;t++)e[t]=rhex(e[t]);return e.join("")}function md5(e){return hex(md51(e))}function add32(e,t){return e+t&4294967295}function add32(e,t){var r=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(r>>16)<<16|65535&r}var GitHubActivity=function(){"use strict";var e={},t={renderLink:function(e,t,r){return t||(t=e),void 0===r&&(r=""),Mustache.render('<a class="'+r+'" href="{{url}}" target="_blank">{{{title}}}</a>',{url:e,title:t})},renderGitHubLink:function(e,r,i){return r||(r=e),void 0===i&&(i=""),t.renderLink("https://github.com/"+e,r,i)},getMessageFor:function(e){var r=e.payload;if(e.repoLink=t.renderGitHubLink(e.repo.name),e.userGravatar=Mustache.render('<div class="gha-gravatar-user"><img src="{{url}}" class="gha-gravatar-small"></div>',{url:e.actor.avatar_url}),r.ref&&("refs/heads/"===r.ref.substring(0,11)?e.branch=r.ref.substring(11):e.branch=r.ref,e.branchLink=t.renderGitHubLink(e.repo.name+"/tree/"+e.branch,e.branch)+" at "),r.commits){var i=r.before+"..."+r.head,n=r.commits.length;2===n?e.commitsMessage=Mustache.render('<a href="https://github.com/{{repo}}/compare/{{shaDiff}}">View comparison for these 2 commits &raquo;</a>',{repo:e.repo.name,shaDiff:i}):n>2&&(e.commitsMessage=Mustache.render('<a href="https://github.com/{{repo}}/compare/{{shaDiff}}">{{length}} more '+pluralize("commit",n-2)+" &raquo;</a>",{repo:e.repo.name,shaDiff:i,length:r.size-2})),r.commits.forEach(function(i,n){return i.message.length>66&&(i.message=i.message.substring(0,66)+"..."),2>n?(i.shaLink=t.renderGitHubLink(e.repo.name+"/commit/"+i.sha,i.sha.substring(0,6),"gha-sha"),void(i.committerGravatar=Mustache.render('<img class="gha-gravatar-commit" src="https://gravatar.com/avatar/{{hash}}" width="16" />',{hash:md5(i.author.email.trim().toLowerCase())}))):(r.commits.splice(2,r.size),!1)})}if(r.issue){var a=e.repo.name+"#"+r.issue.number;e.issueLink=t.renderLink(r.issue.html_url,a),e.issueType="issue",r.issue.pull_request&&(e.issueType="pull request")}if(r.pull_request){var s=r.pull_request;if(e.pullRequestLink=t.renderLink(s.html_url,e.repo.name+"#"+s.number),e.mergeMessage="",r.pull_request.merged){r.action="merged";var o="{{c}} "+pluralize("commit",s.commits)+" with {{a}} "+pluralize("addition",s.additions)+" and {{d}} "+pluralize("deletion",s.deletions);e.mergeMessage=Mustache.render('<br><small class="gha-message-merge">'+o+"</small>",{c:s.commits,a:s.additions,d:s.deletions})}}if(r.comment&&r.comment.pull_request_url){var a=e.repo.name+"#"+r.comment.pull_request_url.split("/").pop();e.pullRequestLink=t.renderLink(r.comment.html_url,a)}if(r.comment&&r.comment.body&&(e.comment=r.comment.body,e.comment.length>150&&(e.comment=e.comment.substring(0,150)+"..."),r.comment.html_url&&r.comment.commit_id)){var a=e.repo.name+"@"+r.comment.commit_id.substring(0,10);e.commentLink=t.renderLink(r.comment.html_url,a)}if("ReleaseEvent"===e.type&&(e.tagLink=t.renderLink(r.release.html_url,r.release.tag_name),e.zipLink=t.renderLink(r.release.zipball_url,"Download Source Code (zip)")),"GollumEvent"===e.type){var l=r.pages[0];e.actionType=l.action,e.message=e.actionType.charAt(0).toUpperCase()+e.actionType.slice(1)+" ",e.message+=t.renderGitHubLink(l.html_url,l.title)}"FollowEvent"===e.type&&(e.targetLink=t.renderGitHubLink(r.target.login)),"ForkEvent"===e.type&&(e.forkLink=t.renderGitHubLink(r.forkee.full_name)),"MemberEvent"===e.type&&(e.memberLink=t.renderGitHubLink(r.member.login)),r.gist&&(e.actionType="fork"===r.action?r.action+"ed":r.action+"d",e.gistLink=t.renderLink(r.gist.html_url,"gist: "+r.gist.id));var c,o=Mustache.render(templates[e.type],e),m=millisecondsToStr(new Date-new Date(e.created_at));c="CreateEvent"==e.type&&["repository","branch","tag"].indexOf(r.ref_type)>=0?icons[e.type+"_"+r.ref_type]:icons[e.type];var u={message:o,icon:c,timeString:m,userLink:t.renderGitHubLink(e.actor.login)};return singleLineActivities.indexOf(e.type)>-1?Mustache.render(templates.SingleLineActivity,u):Mustache.render(templates.Activity,u)},getHeaderHTML:function(e){return e.name?e.userNameLink=t.renderLink(e.html_url,e.name):e.withoutName=" without-name",e.userLink=t.renderLink(e.html_url,e.login),e.gravatarLink=t.renderLink(e.html_url,'<img src="'+e.avatar_url+'">'),Mustache.render(templates.UserHeader,e)},getActivityHTML:function(e,r){var i="",n=e.length;if(r&&r>n&&(r=n),0===(r=r||n))return Mustache.render(templates.NoActivity,{});for(var a=0;r>a;a++)i+=t.getMessageFor(e[a]);return i},getOutputFromRequest:function(e,t){var r=new XMLHttpRequest;r.open("GET",e),r.setRequestHeader("Accept","application/vnd.github.v3+json"),r.onreadystatechange=function(){if(4===r.readyState)if(r.status>=200&&r.status<300){var i=JSON.parse(r.responseText);t(void 0,i)}else t("request for "+e+" yielded status "+r.status)},r.onerror=function(){t("An error occurred connecting to "+e)},r.send()},renderStream:function(e,t){t.innerHTML=Mustache.render(templates.Stream,{text:e,footer:templates.Footer}),t.style.position="relative"},writeOutput:function(e,r){var i="#"===e.charAt(0)?document.getElementById(e.substring(1)):document.getElementsByClassName(e.substring(1));if(i instanceof HTMLCollection)for(var n=0;n<i.length;n++)t.renderStream(r,i[n]);else t.renderStream(r,i)},renderIfReady:function(e,r,i){r&&i&&t.writeOutput(e,r+i)}};return e.feed=function(e){if(!e.username||!e.selector)throw"You must specify the username and selector options for the activity stream.";var r,i,n=e.selector,a="https://api.github.com/users/"+e.username,s=a+"/events";if(e.repository&&(s="https://api.github.com/repos/"+e.username+"/"+e.repository+"/events"),e.clientId&&e.clientSecret){var o="?client_id="+e.clientId+"&client_secret="+e.clientSecret;a+=o,s+=o}if(e.eventsUrl&&(s=e.eventsUrl),"object"==typeof e.templates)for(var l in templates)"string"==typeof e.templates[l]&&(templates[l]=e.templates[l]);t.getOutputFromRequest(a,function(a,s){r=a?Mustache.render(templates.UserNotFound,{username:e.username}):t.getHeaderHTML(s),t.renderIfReady(n,r,i)}),t.getOutputFromRequest(s,function(a,s){if(a)i=Mustache.render(templates.EventsNotFound,{username:e.username});else{var o="undefined"!=e.limit?parseInt(e.limit,10):null;i=t.getActivityHTML(s,o)}t.renderIfReady(n,r,i)})},e}(),hex_chr="0123456789abcdef".split("");md5("hello");var templates={Stream:'<div class="gha-feed">{{{text}}}<div class="gha-push-small"></div>{{{footer}}}</div>',Activity:'<div id="{{id}}" class="gha-activity">               <div class="gha-activity-icon"><span class="octicon octicon-{{icon}}"></span></div>               <div class="gha-message"><div class="gha-time">{{{timeString}}}</div>{{{userLink}}} {{{message}}}</div>               <div class="gha-clear"></div>             </div>',SingleLineActivity:'<div class="gha-activity gha-small">                         <div class="gha-activity-icon"><span class="octicon octicon-{{icon}}"></span></div>                         <div class="gha-message"><div class="gha-time">{{{timeString}}}</div>{{{userLink}}} {{{message}}}</div>                         <div class="gha-clear"></div>                       </div>',UserHeader:'<div class="gha-header">                 <div class="gha-github-icon"><span class="octicon octicon-mark-github"></span></div>                 <div class="gha-user-info{{withoutName}}">{{{userNameLink}}}<p>{{{userLink}}}</p></div>                 <div class="gha-gravatar">{{{gravatarLink}}}</div>               </div><div class="gha-push"></div>',Footer:'<div class="gha-footer">Public Activity <a href="https://github.com/caseyscarborough/github-activity" target="_blank">GitHub Activity Stream</a>',NoActivity:'<div class="gha-info">This user does not have any recent public activity.</div>',UserNotFound:'<div class="gha-info">User {{username}} wasn\'t found.</div>',EventsNotFound:'<div class="gha-info">Events for user {{username}} not found.</div>',CommitCommentEvent:"commented on commit {{{commentLink}}}<br>{{{userGravatar}}}<small>{{comment}}</small>",CreateEvent:"created {{payload.ref_type}} {{{branchLink}}}{{{repoLink}}}",DeleteEvent:"deleted {{payload.ref_type}} {{payload.ref}} at {{{repoLink}}}",FollowEvent:"started following {{{targetLink}}}",ForkEvent:"forked {{{repoLink}}} to {{{forkLink}}}",GistEvent:"{{actionType}} {{{gistLink}}}",GollumEvent:"{{actionType}} the {{{repoLink}}} wiki<br>{{{userGravatar}}}<small>{{{message}}}</small>",IssueCommentEvent:"commented on {{issueType}} {{{issueLink}}}<br>{{{userGravatar}}}<small>{{comment}}</small>",IssuesEvent:"{{payload.action}} issue {{{issueLink}}}<br>{{{userGravatar}}}<small>{{payload.issue.title}}</small>",MemberEvent:"added {{{memberLink}}} to {{{repoLink}}}",PublicEvent:"open sourced {{{repoLink}}}",PullRequestEvent:"{{payload.action}} pull request {{{pullRequestLink}}}<br>{{{userGravatar}}}<small>{{payload.pull_request.title}}</small>{{{mergeMessage}}}",PullRequestReviewCommentEvent:"commented on pull request {{{pullRequestLink}}}<br>{{{userGravatar}}}<small>{{comment}}</small>",PushEvent:'pushed to {{{branchLink}}}{{{repoLink}}}<br>                <ul class="gha-commits">{{#payload.commits}}<li><small>{{{committerGravatar}}} {{{shaLink}}} {{message}}</small></li>{{/payload.commits}}</ul>                <small class="gha-message-commits">{{{commitsMessage}}}</small>',ReleaseEvent:'released {{{tagLink}}} at {{{repoLink}}}<br>{{{userGravatar}}}<small><span class="octicon octicon-cloud-download"></span>  {{{zipLink}}}</small>',WatchEvent:"starred {{{repoLink}}}"},icons={CommitCommentEvent:"comment-discussion",CreateEvent_repository:"repo-create",CreateEvent_tag:"tag-add",CreateEvent_branch:"git-branch-create",DeleteEvent:"repo-delete",FollowEvent:"person-follow",ForkEvent:"repo-forked",GistEvent:"gist",GollumEvent:"repo",IssuesEvent:"issue-opened",IssueCommentEvent:"comment-discussion",MemberEvent:"person",PublicEvent:"globe",PullRequestEvent:"git-pull-request",PullRequestReviewCommentEvent:"comment-discussion",PushEvent:"git-commit",ReleaseEvent:"tag-add",WatchEvent:"star"},singleLineActivities=["CreateEvent","DeleteEvent","FollowEvent","ForkEvent","GistEvent","MemberEvent","WatchEvent"];