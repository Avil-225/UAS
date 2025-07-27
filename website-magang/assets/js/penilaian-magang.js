const penilaianLinkMapping = {
    'Kartu Penilaian Magang': 'https://tk.amikom.ac.id/storage/download/Form%20Penilaian%20Magang.docx'
};

function handleKartuPenilaian() {
    const btnText = 'Kartu Penilaian Magang';
    const targetUrl = penilaianLinkMapping[btnText];
    
    if (targetUrl) {
        const link = document.createElement('a');
        link.href = targetUrl;
        link.download = 'Form_Penilaian_Magang.docx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('Mengunduh kartu penilaian magang...', 'success');
    } else {
        console.log(`Link untuk "${btnText}" belum dikonfigurasi`);
        showNotification('Link belum dikonfigurasi. Silakan hubungi administrator.', 'error');
    }
}

function handleUpload() {
    if (penilaianUploader) {
        penilaianUploader.openModal();
    } else {
        console.error('Penilaian uploader not initialized yet');
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 9999;
        font-size: 14px;
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

class PenilaianUploader {
    constructor() {
        this.uploadedFiles = [];
        this.maxFiles = 5;
        this.maxFileSize = 10 * 1024 * 1024;
        this.allowedTypes = [
            'image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 
            'application/zip', 'application/pdf', 'application/msword', 
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.modal = document.getElementById('uploadModal');
        this.closeBtn = document.getElementById('closeModalBtn');
        this.cancelBtn = document.getElementById('cancelBtn');
        this.saveBtn = document.getElementById('saveBtn');
        this.dragDropArea = document.getElementById('dragDropArea');
        this.fileInput = document.getElementById('fileInput');
        this.urlInput = document.getElementById('urlInput');
        this.urlUploadBtn = document.getElementById('urlUploadBtn');
        this.uploadedFilesContainer = document.getElementById('uploadedFiles');
        this.successMessage = document.getElementById('successMessage');
    }

    bindEvents() {
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.cancelBtn.addEventListener('click', () => this.closeModal());
        this.saveBtn.addEventListener('click', () => this.saveFiles());

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        this.dragDropArea.addEventListener('click', () => this.fileInput.click());
        this.dragDropArea.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.dragDropArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        this.dragDropArea.addEventListener('drop', (e) => this.handleDrop(e));

        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));

        this.urlUploadBtn.addEventListener('click', () => this.handleUrlUpload());
        this.urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUrlUpload();
        });
    }

    openModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.resetModal();
    }

    resetModal() {
        this.uploadedFiles = [];
        this.fileInput.value = '';
        this.urlInput.value = '';
        this.updateFilesList();
        this.updateSaveButton();
        this.successMessage.style.display = 'none';
    }

    handleDragOver(e) {
        e.preventDefault();
        this.dragDropArea.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        this.dragDropArea.classList.remove('dragover');
    }

    handleDrop(e) {
        e.preventDefault();
        this.dragDropArea.classList.remove('dragover');
        const files = Array.from(e.dataTransfer.files);
        this.processFiles(files);
    }

    handleFileSelect(e) {
        const files = Array.from(e.target.files);
        this.processFiles(files);
    }

    processFiles(files) {
        files.forEach(file => {
            if (this.uploadedFiles.length >= this.maxFiles) {
                alert(`Maximum ${this.maxFiles} files allowed`);
                return;
            }

            if (!this.validateFile(file)) {
                return;
            }

            const fileObj = {
                id: Date.now() + Math.random(),
                file: file,
                name: file.name,
                size: this.formatFileSize(file.size),
                type: file.type,
                progress: 0
            };

            this.uploadedFiles.push(fileObj);
            this.simulateUpload(fileObj);
        });

        this.updateFilesList();
        this.updateSaveButton();
    }

    validateFile(file) {
        if (file.size > this.maxFileSize) {
            alert(`File "${file.name}" is too large. Maximum size is 10MB.`);
            return false;
        }

        if (!this.allowedTypes.includes(file.type)) {
            alert(`File type "${file.type}" is not allowed.`);
            return false;
        }

        return true;
    }

    simulateUpload(fileObj) {
        const progressInterval = setInterval(() => {
            fileObj.progress += Math.random() * 30;
            if (fileObj.progress >= 100) {
                fileObj.progress = 100;
                clearInterval(progressInterval);
            }
            this.updateFileProgress(fileObj);
        }, 200);
    }

    handleUrlUpload() {
        const url = this.urlInput.value.trim();
        if (!url) {
            alert('Please enter a valid URL');
            return;
        }

        if (this.uploadedFiles.length >= this.maxFiles) {
            alert(`Maximum ${this.maxFiles} files allowed`);
            return;
        }

        const fileName = url.split('/').pop() || 'url-file';
        
        const fileObj = {
            id: Date.now() + Math.random(),
            name: fileName,
            size: 'Unknown',
            type: 'url',
            url: url,
            progress: 100
        };

        this.uploadedFiles.push(fileObj);
        this.urlInput.value = '';
        this.updateFilesList();
        this.updateSaveButton();
    }

    removeFile(fileId) {
        this.uploadedFiles = this.uploadedFiles.filter(file => file.id !== fileId);
        this.updateFilesList();
        this.updateSaveButton();
    }

    updateFilesList() {
        this.uploadedFilesContainer.innerHTML = '';
        
        this.uploadedFiles.forEach(file => {
            const fileElement = this.createFileElement(file);
            this.uploadedFilesContainer.appendChild(fileElement);
        });
    }

    createFileElement(file) {
        const fileDiv = document.createElement('div');
        fileDiv.className = 'file-item';
        fileDiv.innerHTML = `
            <div class="file-icon">${this.getFileIcon(file.type)}</div>
            <div class="file-info">
                <div class="file-name">${file.name}</div>
                <div class="file-size">${file.size}</div>
                ${file.progress < 100 ? `<div class="progress-bar"><div class="progress-fill" style="width: ${file.progress}%"></div></div>` : ''}
            </div>
            <button class="remove-file-btn" onclick="penilaianUploader.removeFile('${file.id}')">&times;</button>
        `;
        return fileDiv;
    }

    updateFileProgress(file) {
        const fileElements = this.uploadedFilesContainer.querySelectorAll('.file-item');
        fileElements.forEach(element => {
            const fileName = element.querySelector('.file-name').textContent;
            if (fileName === file.name) {
                const progressFill = element.querySelector('.progress-fill');
                if (progressFill) {
                    progressFill.style.width = `${file.progress}%`;
                }
            }
        });
    }

    getFileIcon(type) {
        if (type.startsWith('image/')) return '🖼️';
        if (type.includes('pdf')) return '📄';
        if (type.includes('word') || type.includes('doc')) return '📝';
        if (type.includes('zip')) return '📦';
        if (type === 'url') return '🔗';
        return '📄';
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    updateSaveButton() {
        this.saveBtn.disabled = this.uploadedFiles.length === 0;
    }

    saveFiles() {
        console.log('Saving penilaian files:', this.uploadedFiles);
        
        this.successMessage.style.display = 'block';
        
        setTimeout(() => {
            this.closeModal();
            showNotification('Form penilaian berhasil diupload!', 'success');
        }, 1500);
    }
}

let penilaianUploader;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Penilaian Magang page loaded');
    penilaianUploader = new PenilaianUploader();
    
    const kartuBtn = document.querySelector('.btn-kartu-penilaian');
    if (kartuBtn) {
        kartuBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        kartuBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
});