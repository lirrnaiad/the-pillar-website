import { useState, useEffect } from 'react';
import './VideoFrame.css';

/**
 * Extract video embed from HTML content
 * Supports YouTube, Vimeo iframes, and video tags
 */
const extractVideoEmbed = (htmlContent) => {
  if (!htmlContent) return null;

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;

  // Check for iframe (YouTube, Vimeo)
  const iframe = tempDiv.querySelector('iframe');
  if (iframe && iframe.src) {
    return {
      type: 'iframe',
      src: iframe.src,
      embedCode: iframe.outerHTML,
    };
  }

  // Check for video tag
  const video = tempDiv.querySelector('video');
  if (video) {
    const source = video.querySelector('source');
    if (source && source.src) {
      return {
        type: 'video',
        src: source.src,
        embedCode: video.outerHTML,
      };
    }
    if (video.src) {
      return {
        type: 'video',
        src: video.src,
        embedCode: video.outerHTML,
      };
    }
  }

  // Check for YouTube/Vimeo links in anchor tags or text
  const links = tempDiv.querySelectorAll('a');
  for (const link of links) {
    const href = link.href || link.getAttribute('href') || '';
    if (href.includes('youtube.com') || href.includes('youtu.be')) {
      // Extract video ID and create embed URL
      const videoId = extractYouTubeId(href);
      if (videoId) {
        return {
          type: 'youtube',
          videoId: videoId,
          src: `https://www.youtube.com/embed/${videoId}`,
        };
      }
    }
    if (href.includes('vimeo.com')) {
      const videoId = extractVimeoId(href);
      if (videoId) {
        return {
          type: 'vimeo',
          videoId: videoId,
          src: `https://player.vimeo.com/video/${videoId}`,
        };
      }
    }
  }

  return null;
};

/**
 * Extract YouTube video ID from URL
 */
const extractYouTubeId = (url) => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) return match[1];
  }
  return null;
};

/**
 * Extract Vimeo video ID from URL
 */
const extractVimeoId = (url) => {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
};

/**
 * VideoFrame component with error handling and placeholder support
 * Ensures video frames always render even when videos are missing or fail to load
 * 
 * @param {string} content - HTML content that may contain video embeds
 * @param {string} coverUrl - Cover image URL as fallback thumbnail
 * @param {string} className - Additional CSS classes
 */
const VideoFrame = ({ content = '', coverUrl = null, className = '' }) => {
  const [videoEmbed, setVideoEmbed] = useState(null);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (content) {
      const embed = extractVideoEmbed(content);
      setVideoEmbed(embed);
      setIsLoading(false);
      if (!embed) {
        setVideoError(true);
      }
    } else {
      setIsLoading(false);
      setVideoError(true);
    }
  }, [content]);

  const handleIframeError = () => {
    setVideoError(true);
  };

  // Determine if we should show placeholder
  const showPlaceholder = !videoEmbed || videoError;

  const frameClasses = `videos-article__video-frame ${className}`.trim();

  return (
    <div className={frameClasses}>
      {showPlaceholder ? (
        <div className="videos-article__video-placeholder">
          {coverUrl ? (
            <img 
              src={coverUrl} 
              alt="Video thumbnail" 
              className="videos-article__video-thumbnail"
            />
          ) : (
            <div className="videos-article__video-placeholder-content">
              No Video
            </div>
          )}
        </div>
      ) : (
        <div className="videos-article__video-container">
          {videoEmbed.type === 'iframe' && (
            <iframe
              src={videoEmbed.src}
              className="videos-article__video-embed"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onError={handleIframeError}
              title="Video embed"
            />
          )}
          {videoEmbed.type === 'youtube' && (
            <iframe
              src={videoEmbed.src}
              className="videos-article__video-embed"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onError={handleIframeError}
              title="YouTube video"
            />
          )}
          {videoEmbed.type === 'vimeo' && (
            <iframe
              src={videoEmbed.src}
              className="videos-article__video-embed"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              onError={handleIframeError}
              title="Vimeo video"
            />
          )}
          {videoEmbed.type === 'video' && (
            <video
              src={videoEmbed.src}
              className="videos-article__video-element"
              controls
              onError={handleIframeError}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoFrame;

