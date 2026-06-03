// @ts-ignore
import STYLES from './help-sidebar-widget.css';

const TEMPLATE = `
  <button class="hw-trigger-btn" id="hw-trigger-btn" title="Open Help & Support" aria-label="Help and Support">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  </button>

  <div class="hw-backdrop" id="hw-backdrop"></div>

  <div class="hw-lightbox" id="hw-lightbox">
    <button class="hw-lightbox-close" id="hw-lightbox-close" aria-label="Close image preview">✕</button>
    <img class="hw-lightbox-img" id="hw-lightbox-img" src="" alt="Enlarged screenshot" />
  </div>

  <div class="hw-sidebar" id="hw-sidebar">
    <div class="hw-header">
      <h2 class="hw-header-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        Help & Support
      </h2>
      <button class="hw-close-btn" id="hw-close-btn" aria-label="Close sidebar">✕</button>
    </div>

    <div class="hw-tabs">
      <button class="hw-tab-btn active" data-tab="guide">Help Guide</button>
      <button class="hw-tab-btn" data-tab="feedback">Support & Feedback</button>
      <button class="hw-tab-btn" data-tab="status">Ticket Status</button>
    </div>

    <div class="hw-body">
      <!-- 1. HELP GUIDE PANEL -->
      <div class="hw-tab-panel active" id="hw-panel-guide">
        <div id="hw-guide-loading" class="hw-loader"></div>
        <div id="hw-guide-container"></div>
      </div>

      <!-- 2. SUPPORT & FEEDBACK PANEL -->
      <div class="hw-tab-panel" id="hw-panel-feedback">
        <div id="hw-form-status" style="display:none"></div>

        <div class="hw-field">
          <label class="hw-label" for="hw-name">Full Name *</label>
          <input class="hw-input" id="hw-name" type="text" placeholder="Your name" required />
        </div>

        <div class="hw-field">
          <label class="hw-label" for="hw-email">Email Address *</label>
          <input class="hw-input" id="hw-email" type="email" placeholder="your.email@domain.com" required />
        </div>

        <div class="hw-field">
          <label class="hw-label" for="hw-subject">Subject *</label>
          <input class="hw-input" id="hw-subject" type="text" placeholder="Brief summary of your request" required />
        </div>

        <div class="hw-field">
          <label class="hw-label" for="hw-category">Category *</label>
          <select class="hw-select" id="hw-category">
            <option value="bug">Bug Report 🐛</option>
            <option value="feature">Feature Request 💡</option>
            <option value="support">General Support ❔</option>
            <option value="other">Other 📝</option>
          </select>
        </div>

        <div class="hw-field">
          <label class="hw-label" for="hw-description">Description *</label>
          <textarea class="hw-textarea" id="hw-description" placeholder="Describe your request in detail..." required></textarea>
        </div>

        <div class="hw-field">
          <label class="hw-label">Screenshot (optional)</label>
          <input class="hw-file-input" id="hw-file" type="file" accept="image/*" />
          <div class="hw-upload-zone" id="hw-upload-zone" tabindex="0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <p class="hw-upload-hint">Drag & drop image here, or paste</p>
            <p class="hw-upload-sub">PNG, JPG, GIF up to 10MB</p>
            <div class="hw-upload-actions">
              <button class="hw-btn-paste" id="hw-paste-btn" type="button">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <rect x="8" y="2" width="8" height="4" rx="1"/>
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                </svg>
                Paste (Ctrl+V)
              </button>
              <button class="hw-btn-browse" id="hw-browse-btn" type="button">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                Browse
              </button>
            </div>
          </div>
          <div id="hw-preview" style="display:none"></div>
        </div>

        <div style="margin-top:auto; padding-top:16px;">
          <button class="hw-btn-submit" id="hw-submit-btn">Submit Request</button>
        </div>
      </div>

      <!-- 3. TICKET STATUS PANEL -->
      <div class="hw-tab-panel" id="hw-panel-status">
        <div class="hw-list-header">
          <h3 class="hw-list-title">Your Submitted Tickets</h3>
          <button class="hw-btn-refresh" id="hw-refresh-btn" type="button">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
            </svg>
            Refresh Status
          </button>
        </div>
        
        <div id="hw-tickets-loading" class="hw-loader" style="display:none"></div>
        <div class="hw-ticket-list" id="hw-ticket-list"></div>
      </div>
    </div>
  </div>
`;

export class HelpSidebarWidgetElement extends HTMLElement {
  _shadow: ShadowRoot;
  _screenshotFile: File | null = null;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['user-name', 'user-email', 'button-style', 'theme'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (!this._shadow) return;
    if (name === 'user-name') {
      const input = this._shadow.getElementById('hw-name') as HTMLInputElement | null;
      if (input) input.value = newValue || '';
    }
    if (name === 'user-email') {
      const input = this._shadow.getElementById('hw-email') as HTMLInputElement | null;
      if (input) input.value = newValue || '';
    }
  }

  connectedCallback() {
    this._shadow.innerHTML = `<style>${STYLES}</style>${TEMPLATE}`;

    // Load custom font to be completely premium
    if (!document.getElementById('hw-font-link')) {
      const link = document.createElement('link');
      link.id = 'hw-font-link';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
      document.head.appendChild(link);
    }

    this._applyAttributes();
    this._bindEvents();

    // Pre-fill user session attributes if provided
    const defaultName = this.getAttribute('user-name');
    if (defaultName) {
      const nameInput = this._shadow.getElementById('hw-name') as HTMLInputElement | null;
      if (nameInput) nameInput.value = defaultName;
    }
    const defaultEmail = this.getAttribute('user-email');
    if (defaultEmail) {
      const emailInput = this._shadow.getElementById('hw-email') as HTMLInputElement | null;
      if (emailInput) emailInput.value = defaultEmail;
    }

    this._loadLocalHelpGuide();
  }

  _applyAttributes() {
    const btn = this._shadow.getElementById('hw-trigger-btn');
    if (!btn) return;
    const style = this.getAttribute('button-style');
    if (style === 'minimal') {
      btn.classList.add('minimal');
    } else if (style === 'hidden') {
      btn.classList.add('hidden');
    }
  }

  _bindEvents() {
    const s = this._shadow;

    // Toggle Sidebar
    s.getElementById('hw-trigger-btn')?.addEventListener('click', () => this.openSidebar());
    s.getElementById('hw-close-btn')?.addEventListener('click', () => this.closeSidebar());
    s.getElementById('hw-backdrop')?.addEventListener('click', () => this.closeSidebar());

    // Tabs Switch
    const tabButtons = s.querySelectorAll('.hw-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        s.querySelectorAll('.hw-tab-panel').forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const activeBtn = btn as HTMLElement;
        const panelId = `hw-panel-${activeBtn.dataset.tab}`;
        s.getElementById(panelId)?.classList.add('active');

        if (activeBtn.dataset.tab === 'status') {
          this._loadTicketsStatus();
        }
      });
    });

    // Accordions in Help Guide (Event Delegation)
    const guideContainer = s.getElementById('hw-guide-container');
    if (guideContainer) {
      guideContainer.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const header = target.closest('.hw-faq-header');
        if (!header) return;

        const item = header.parentElement;
        if (!item) return;
        const content = item.querySelector('.hw-faq-content') as HTMLElement | null;
        if (!content) return;
        const isOpen = item.classList.contains('open');

        // Close all
        guideContainer.querySelectorAll('.hw-faq-item').forEach(i => {
          i.classList.remove('open');
          const c = i.querySelector('.hw-faq-content') as HTMLElement | null;
          if (c) c.style.maxHeight = '0px';
        });

        if (!isOpen) {
          item.classList.add('open');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }

    // Browse screenshot
    const fileInput = s.getElementById('hw-file') as HTMLInputElement | null;
    s.getElementById('hw-browse-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      fileInput?.click();
    });
    fileInput?.addEventListener('change', () => {
      if (fileInput.files && fileInput.files[0]) this._handleFile(fileInput.files[0]);
    });

    // Paste screenshot button
    s.getElementById('hw-paste-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this._pasteFromClipboard();
    });

    // Ctrl+V anywhere in sidebar body
    s.getElementById('hw-sidebar')?.addEventListener('paste', (e: any) => {
      const items = e.clipboardData?.items || [];
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) { this._handleFile(file); break; }
        }
      }
    });

    // Drag & Drop
    const zone = s.getElementById('hw-upload-zone');
    zone?.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
    zone?.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone?.addEventListener('drop', (e: any) => {
      e.preventDefault();
      zone.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) this._handleFile(file);
    });

    // Submit Form
    s.getElementById('hw-submit-btn')?.addEventListener('click', () => this._submitTicket());

    // Refresh Tickets
    s.getElementById('hw-refresh-btn')?.addEventListener('click', () => this._loadTicketsStatus());

    // Lightbox triggers for Guide Images
    if (guideContainer) {
      guideContainer.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('hw-step-img')) {
          const imgSrc = (target as HTMLImageElement).src;
          this._openLightbox(imgSrc);
        }
      });
    }

    // Lightbox triggers for Upload Preview Images
    const previewContainer = s.getElementById('hw-preview');
    if (previewContainer) {
      previewContainer.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('hw-preview-img')) {
          const imgSrc = (target as HTMLImageElement).src;
          this._openLightbox(imgSrc);
        }
      });
    }

    // Close Lightbox
    s.getElementById('hw-lightbox-close')?.addEventListener('click', () => this._closeLightbox());
    s.getElementById('hw-lightbox')?.addEventListener('click', (e) => {
      if (e.target === s.getElementById('hw-lightbox')) {
        this._closeLightbox();
      }
    });
  }

  openSidebar() {
    this._shadow.getElementById('hw-sidebar')?.classList.add('open');
    this._shadow.getElementById('hw-backdrop')?.classList.add('open');
  }

  closeSidebar() {
    this._shadow.getElementById('hw-sidebar')?.classList.remove('open');
    this._shadow.getElementById('hw-backdrop')?.classList.remove('open');
    this._hideStatus();
  }

  _openLightbox(src: string) {
    const lightbox = this._shadow.getElementById('hw-lightbox');
    const img = this._shadow.getElementById('hw-lightbox-img') as HTMLImageElement | null;
    if (lightbox && img) {
      img.src = src;
      lightbox.classList.add('open');
    }
  }

  _closeLightbox() {
    const lightbox = this._shadow.getElementById('hw-lightbox');
    if (lightbox) {
      lightbox.classList.remove('open');
    }
  }

  async _pasteFromClipboard() {
    try {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        const imageType = item.types.find(t => t.startsWith('image/'));
        if (imageType) {
          const blob = await item.getType(imageType);
          this._handleFile(new File([blob], 'screenshot.png', { type: imageType }));
          return;
        }
      }
      this._showStatus('No image found in clipboard. Copy a screenshot first, then paste.', 'error');
    } catch {
      this._showStatus('Press Ctrl+V inside this sidebar to paste a screenshot.', 'error');
    }
  }

  _handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      this._showStatus('Please upload an image file (PNG, JPG, GIF).', 'error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      this._showStatus('Screenshot must be smaller than 10MB.', 'error');
      return;
    }
    this._screenshotFile = file;
    this._hideStatus();

    const url = URL.createObjectURL(file);
    const zone = this._shadow.getElementById('hw-upload-zone');
    const preview = this._shadow.getElementById('hw-preview');

    if (zone) zone.style.display = 'none';
    if (preview) {
      preview.style.display = 'block';
      preview.innerHTML = `
        <div class="hw-preview-wrap">
          <img class="hw-preview-img" src="${url}" alt="Screenshot preview" />
          <button class="hw-preview-remove" id="hw-remove-ss-btn" type="button">✕ Remove</button>
        </div>
        <p class="hw-preview-name">${file.name}</p>
      `;
      preview.querySelector('#hw-remove-ss-btn')?.addEventListener('click', () => this._removeFile());
    }
  }

  _removeFile() {
    this._screenshotFile = null;
    const fileInput = this._shadow.getElementById('hw-file') as HTMLInputElement | null;
    if (fileInput) fileInput.value = '';
    const zone = this._shadow.getElementById('hw-upload-zone');
    if (zone) zone.style.display = 'flex';
    const preview = this._shadow.getElementById('hw-preview');
    if (preview) {
      preview.style.display = 'none';
      preview.innerHTML = '';
    }
  }

  _resetForm() {
    const nameInput = this._shadow.getElementById('hw-name') as HTMLInputElement | null;
    const emailInput = this._shadow.getElementById('hw-email') as HTMLInputElement | null;
    const subjectInput = this._shadow.getElementById('hw-subject') as HTMLInputElement | null;
    const descInput = this._shadow.getElementById('hw-description') as HTMLTextAreaElement | null;
    const catSelect = this._shadow.getElementById('hw-category') as HTMLSelectElement | null;

    if (nameInput) nameInput.value = '';
    if (emailInput) emailInput.value = '';
    if (subjectInput) subjectInput.value = '';
    if (descInput) descInput.value = '';
    if (catSelect) catSelect.value = 'bug';

    this._removeFile();
    this._hideStatus();

    const submitBtn = this._shadow.getElementById('hw-submit-btn') as HTMLButtonElement | null;
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Request';
    }
  }

  async _submitTicket() {
    const name = (this._shadow.getElementById('hw-name') as HTMLInputElement | null)?.value.trim() || '';
    const email = (this._shadow.getElementById('hw-email') as HTMLInputElement | null)?.value.trim() || '';
    const subject = (this._shadow.getElementById('hw-subject') as HTMLInputElement | null)?.value.trim() || '';
    const description = (this._shadow.getElementById('hw-description') as HTMLTextAreaElement | null)?.value.trim() || '';
    const category = (this._shadow.getElementById('hw-category') as HTMLSelectElement | null)?.value || 'bug';

    if (!name || !email || !subject || !description) {
      this._showStatus('Please fill in all required fields.', 'error');
      return;
    }

    const baseUrl = (this.getAttribute('base-url') || '').replace(/\/$/, '');
    const embedKey = this.getAttribute('embed-key') || '';

    if (!baseUrl || !embedKey) {
      this._showStatus('Widget is misconfigured. Missing base-url or embed-key.', 'error');
      return;
    }

    const submitBtn = this._shadow.getElementById('hw-submit-btn') as HTMLButtonElement | null;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting Request...';
    }

    const formData = new FormData();
    formData.append('submitter_name', name);
    formData.append('submitter_email', email);
    formData.append('subject', subject);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('embed_key', embedKey);
    formData.append('source_url', window.location.href);
    formData.append('browser_metadata', JSON.stringify({
      userAgent: navigator.userAgent,
      resolution: `${screen.width}x${screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language,
    }));
    if (this._screenshotFile) {
      formData.append('screenshot', this._screenshotFile, this._screenshotFile.name);
    }

    try {
      const response = await fetch(`${baseUrl}/api/tickets/widget-submit/`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        this._showStatus('Support request submitted successfully!', 'success');

        setTimeout(() => {
          this._resetForm();
          // Switch tab to Status to show the submitted ticket
          const statusTab = this._shadow.querySelector('.hw-tab-btn[data-tab="status"]') as HTMLElement | null;
          if (statusTab) statusTab.click();
        }, 1800);
      } else {
        const err = await response.json().catch(() => ({}));
        this._showStatus(err.detail || err.error || 'Failed to submit request. Please try again.', 'error');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Request';
        }
      }
    } catch (err) {
      console.error('Error submitting support request:', err);
      this._showStatus('Network error. Please check your internet connection.', 'error');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Request';
      }
    }
  }

  async _loadTicketsStatus() {
    const baseUrl = (this.getAttribute('base-url') || '').replace(/\/$/, '');
    const embedKey = this.getAttribute('embed-key') || '';
    const listContainer = this._shadow.getElementById('hw-ticket-list');
    const loader = this._shadow.getElementById('hw-tickets-loading');

    if (!listContainer) return;

    if (!baseUrl || !embedKey) {
      listContainer.innerHTML = '<div class="hw-empty-state">Widget configuration error (missing URL or key)</div>';
      return;
    }

    if (loader) loader.style.display = 'block';
    listContainer.style.opacity = '0.5';

    try {
      const response = await fetch(`${baseUrl}/api/tickets/widget-status/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embed_key: embedKey })
      });

      if (response.ok) {
        const statusRes = await response.json();
        const payload = statusRes.data || statusRes; // unwrap CustomJSONRenderer's { success, data } envelope
        const serverTickets = payload.tickets || [];

        if (serverTickets.length === 0) {
          listContainer.innerHTML = `
            <div class="hw-empty-state">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                <path d="M12 8v4"/>
                <path d="M12 16h.01"/>
              </svg>
              <p style="margin: 0; font-weight:600;">No support tickets yet</p>
              <p style="margin: 0; font-size:11px;">Any bug reports or tickets you or your teammates submit will appear here to let everyone track their real-time progress.</p>
            </div>
          `;
          return;
        }

        // Build output HTML & merge
        let html = '';
        serverTickets.forEach((t: any) => {
          const finalStatus = t.status || 'open';
          const finalNumber = t.ticket_number || 'TKT-PENDING';
          const dateStr = new Date(t.created_at).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });

          // Map status CSS class
          let badgeClass = 'hw-badge-open';
          if (finalStatus === 'in_progress') badgeClass = 'hw-badge-progress';
          else if (finalStatus === 'pending') badgeClass = 'hw-badge-pending';
          else if (finalStatus === 'resolved') badgeClass = 'hw-badge-resolved';
          else if (finalStatus === 'closed') badgeClass = 'hw-badge-closed';

          html += `
            <div class="hw-ticket-card">
              <div class="hw-ticket-card-header">
                <span class="hw-ticket-card-number">${finalNumber}</span>
                <span class="hw-ticket-card-badge ${badgeClass}">${finalStatus.replace('_', ' ')}</span>
              </div>
              <h4 class="hw-ticket-card-subject">${t.subject || 'No Subject'}</h4>
              <div class="hw-ticket-card-footer" style="flex-direction: column; align-items: flex-start; gap: 4px;">
                <div style="display: flex; justify-content: space-between; width: 100%;">
                  <span>Category: ${t.category.toUpperCase()}</span>
                  <span>${dateStr}</span>
                </div>
                <div style="font-size: 11px; color: #888; display: flex; align-items: center; gap: 4px; margin-top: 4px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 4px; width: 100%;">
                  <span>👤 By: <strong>${t.submitter_name || 'Anonymous'}</strong> (${t.submitter_email || 'no-email'})</span>
                </div>
              </div>
            </div>
          `;
        });
        listContainer.innerHTML = html;
      } else {
        throw new Error('Server status fetch failed');
      }
    } catch (err) {
      console.error('Failed to pull live ticket status:', err);
      listContainer.innerHTML = `
        <div class="hw-empty-state">
          <p style="margin: 0; font-weight:600; color: #f43f5e;">Failed to load tickets</p>
          <p style="margin: 0; font-size:11px;">A connection error occurred. Click "Refresh Status" to retry.</p>
        </div>
      `;
    } finally {
      if (loader) loader.style.display = 'none';
      listContainer.style.opacity = '1';
    }
  }

  _showStatus(msg: string, type: 'success' | 'error') {
    const el = this._shadow.getElementById('hw-form-status');
    if (el) {
      el.textContent = msg;
      el.className = `hw-status-msg ${type}`;
      el.style.display = 'block';
    }
  }

  _hideStatus() {
    const el = this._shadow.getElementById('hw-form-status');
    if (el) el.style.display = 'none';
  }

  async _loadLocalHelpGuide() {
    const guideContainer = this._shadow.getElementById('hw-guide-container');
    const loader = this._shadow.getElementById('hw-guide-loading');
    const guideUrl = this.getAttribute('guide-url') || '/help-guide.json';

    try {
      const response = await fetch(guideUrl);
      if (response.ok) {
        const data = await response.json();
        this._renderHelpGuide(data);
      } else {
        throw new Error('Guide file not found');
      }
    } catch (err) {
      console.warn(`Dynamic help guide not found at ${guideUrl}. Falling back to default FAQs.`);
      this._renderHelpGuide(this._getDefaultHelpGuide());
    } finally {
      if (loader) loader.style.display = 'none';
    }
  }

  _getDefaultHelpGuide() {
    return {
      title: "Help Guide & FAQs",
      steps: [
        {
          step_number: 1,
          title: "What is ThriveX AI Dashboard?",
          description: "ThriveX AI is an intelligent project workspace and agile issue tracking platform. You can manage tasks in Kanban boards, set priorities, assign developers, and aggregate support requests in one beautiful console."
        },
        {
          step_number: 2,
          title: "How do I submit feedback / bugs?",
          description: "Click on the <strong>Support & Feedback</strong> tab in this sidebar, select your category, enter your subject and description, paste or attach an optional screenshot, and click submit."
        },
        {
          step_number: 3,
          title: "How do I track my ticket status?",
          description: "Any ticket you submit from this browser will be listed under the <strong>Ticket Status</strong> tab. We use secure, unguessable ticket UUIDs saved locally to fetch live real-time statuses directly from the project server."
        },
        {
          step_number: 4,
          title: "How do I invite members to my project?",
          description: "Go to the Workspace page inside the dashboard, select your project, click on <strong>Manage Members</strong> on the top-right, search for your team members by their username or email, and add them."
        }
      ]
    };
  }

  _renderHelpGuide(data: any) {
    const container = this._shadow.getElementById('hw-guide-container');
    if (!container) return;

    let html = '';
    
    if (data.title) {
      html += `<h3 class="hw-guide-main-title">${data.title}</h3>`;
    }

    const steps = data.steps || [];
    steps.forEach((step: any, index: number) => {
      const stepNum = step.step_number || step.number || (index + 1);
      const isOpen = index === 0 ? 'open' : '';
      const maxHeight = index === 0 ? 'style="max-height: 1000px;"' : 'style="max-height: 0px;"';
      
      let imagesHtml = '';
      if (Array.isArray(step.images) && step.images.length > 0) {
        imagesHtml = '<div class="hw-step-images-list">';
        step.images.forEach((imgSrc: string) => {
          imagesHtml += `
            <div class="hw-step-image-wrap">
              <img class="hw-step-img" src="${imgSrc}" alt="Step ${stepNum} screenshot" />
            </div>
          `;
        });
        imagesHtml += '</div>';
      }

      let noteHtml = '';
      if (step.note) {
        noteHtml = `
          <div class="hw-step-note flex gap-2">
            <svg class="hw-note-icon text-blue-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #3b82f6;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            <p class="hw-note-desc">${step.note}</p>
          </div>
        `;
      }

      let importantNoteHtml = '';
      if (step.importantNote) {
        importantNoteHtml = `
          <div class="hw-step-important flex gap-2">
            <svg class="hw-important-icon text-amber-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #f59e0b;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <div>
              <p class="hw-important-title">Important Note</p>
              <p class="hw-important-desc">${step.importantNote}</p>
            </div>
          </div>
        `;
      }

      html += `
        <div class="hw-faq-item ${isOpen}">
          <div class="hw-faq-header">
            <div class="hw-step-header-left">
              <span class="hw-step-number">${stepNum}</span>
              <span class="hw-step-title">${step.title}</span>
            </div>
            <span class="hw-faq-icon">▼</span>
          </div>
          <div class="hw-faq-content" ${maxHeight}>
            <div class="hw-faq-inner">
              <p class="hw-step-desc">${step.description}</p>
              ${imagesHtml}
              ${noteHtml}
              ${importantNoteHtml}
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }
}

if (typeof window !== 'undefined' && !customElements.get('help-sidebar-widget')) {
  customElements.define('help-sidebar-widget', HelpSidebarWidgetElement);
}
