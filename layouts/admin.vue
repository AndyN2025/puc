<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="admin-logo">
        <span class="logo-icon">⚙️</span>
        <span class="logo-text">Админ-панель</span>
      </div>
      <nav class="admin-nav">
        <NuxtLink to="/admin" class="nav-item" exact-active-class="active">
          <span class="nav-icon">🏠</span>
          <span>Главный экран</span>
        </NuxtLink>
        <NuxtLink to="/admin/news" class="nav-item" active-class="active">
          <span class="nav-icon">📰</span>
          <span>Новости</span>
        </NuxtLink>
        <NuxtLink to="/admin/courses" class="nav-item" active-class="active">
          <span class="nav-icon">📚</span>
          <span>Учебные курсы</span>
        </NuxtLink>
        <NuxtLink to="/admin/teachers" class="nav-item" active-class="active">
          <span class="nav-icon">👩‍🏫</span>
          <span>Пед. состав</span>
        </NuxtLink>
        <NuxtLink to="/admin/classrooms" class="nav-item" active-class="active">
          <span class="nav-icon">🏫</span>
          <span>Аудитории (МТО)</span>
        </NuxtLink>
        <NuxtLink to="/admin/documents" class="nav-item" active-class="active">
          <span class="nav-icon">📄</span>
          <span>Бланки документов</span>
        </NuxtLink>
        <div class="nav-divider"></div>
        <NuxtLink to="/" class="nav-item nav-back">
          <span class="nav-icon">↩️</span>
          <span>На сайт</span>
        </NuxtLink>
      </nav>
    </aside>
    <main class="admin-main">
      <slot />
    </main>
  </div>
</template>

<style lang="scss">
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #0f1117;
  color: #e4e4e7;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.admin-sidebar {
  width: 260px;
  background: #16181d;
  border-right: 1px solid #26282e;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
}

.admin-logo {
  padding: 24px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #26282e;

  .logo-icon {
    font-size: 24px;
  }

  .logo-text {
    font-size: 18px;
    font-weight: 700;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.admin-nav {
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 10px;
    color: #9ca3af;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;

    &:hover {
      background: #1e2028;
      color: #e4e4e7;
    }

    &.active {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.1));
      color: #a5b4fc;
      font-weight: 600;
    }

    .nav-icon {
      font-size: 18px;
      width: 24px;
      text-align: center;
    }
  }

  .nav-divider {
    height: 1px;
    background: #26282e;
    margin: 8px 16px;
  }

  .nav-back {
    color: #6b7280;

    &:hover {
      color: #e4e4e7;
    }
  }
}

.admin-main {
  flex: 1;
  margin-left: 260px;
  padding: 32px 40px;
  min-height: 100vh;
}

/* Shared admin styles */
.admin-page-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #e4e4e7, #a5b4fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.admin-page-desc {
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 32px;
}

.admin-card {
  background: #16181d;
  border: 1px solid #26282e;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
}

.admin-card-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #e4e4e7;
}

.admin-form-group {
  margin-bottom: 20px;

  label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: #9ca3af;
    margin-bottom: 6px;
  }

  input, textarea, select {
    width: 100%;
    padding: 10px 14px;
    background: #0f1117;
    border: 1px solid #26282e;
    border-radius: 10px;
    color: #e4e4e7;
    font-size: 14px;
    font-family: inherit;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: #6366f1;
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
}

.admin-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  &.primary {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;

    &:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
  }

  &.secondary {
    background: #1e2028;
    color: #9ca3af;
    border: 1px solid #26282e;

    &:hover {
      color: #e4e4e7;
      border-color: #3f3f46;
    }
  }

  &.danger {
    background: rgba(239, 68, 68, 0.1);
    color: #f87171;
    border: 1px solid rgba(239, 68, 68, 0.2);

    &:hover {
      background: rgba(239, 68, 68, 0.2);
    }
  }

  &.sm {
    padding: 6px 12px;
    font-size: 12px;
    border-radius: 8px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.admin-actions {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #26282e;
    font-size: 14px;
  }

  th {
    color: #6b7280;
    font-weight: 500;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  tr:hover td {
    background: rgba(99, 102, 241, 0.04);
  }
}

.admin-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;

  &.enabled {
    background: rgba(34, 197, 94, 0.1);
    color: #4ade80;
  }

  &.disabled {
    background: rgba(239, 68, 68, 0.1);
    color: #f87171;
  }
}

.admin-toggle {
  position: relative;
  width: 44px;
  height: 24px;
  cursor: pointer;

  input {
    display: none;
  }

  .slider {
    position: absolute;
    inset: 0;
    background: #26282e;
    border-radius: 24px;
    transition: 0.3s;

    &:before {
      content: '';
      position: absolute;
      left: 3px;
      top: 3px;
      width: 18px;
      height: 18px;
      background: #6b7280;
      border-radius: 50%;
      transition: 0.3s;
    }
  }

  input:checked + .slider {
    background: #6366f1;

    &:before {
      transform: translateX(20px);
      background: white;
    }
  }
}

.admin-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #22c55e;
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  z-index: 9999;
  animation: slideUp 0.3s ease, fadeOut 0.3s ease 2s forwards;
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes fadeOut {
  to { opacity: 0; transform: translateY(-10px); }
}

.admin-empty {
  text-align: center;
  padding: 40px;
  color: #6b7280;
  font-size: 14px;
}

.admin-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.admin-tabs {
  display: flex;
  gap: 4px;
  background: #16181d;
  border: 1px solid #26282e;
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 24px;
  overflow-x: auto;

  .admin-tab {
    padding: 10px 18px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
    border: none;
    background: none;
    font-family: inherit;

    &:hover {
      color: #e4e4e7;
      background: #1e2028;
    }

    &.active {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white;
    }
  }
}
</style>
