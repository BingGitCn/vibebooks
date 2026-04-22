<template>
  <div
    class="entity-card swiss-border swiss-hover-accent clickable"
    :class="{ 'expanded': isExpanded }"
    @click="handleClick"
  >
    <!-- Entity Number -->
    <div class="entity-number">{{ String(number).padStart(2, '0') }}</div>

    <!-- Entity Info -->
    <div class="entity-info">
      <h3 class="entity-name">{{ entity.name }}</h3>
      <p class="entity-role">{{ entity.role }}</p>
      <p class="entity-desc">{{ entity.desc }}</p>
    </div>

    <!-- Entity Quote -->
    <div class="entity-quote" :class="textureClass">
      "{{ entity.quote }}"
    </div>

    <!-- Expanded Details -->
    <div class="entity-details" v-if="isExpanded">
      <div class="detail-section" v-for="(section, index) in entity.details" :key="index">
        <p class="detail-label">{{ section.label }}</p>
        <p class="detail-text">{{ section.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  number: {
    type: Number,
    required: true
  },
  entity: {
    type: Object,
    required: true,
    validator: (value) => {
      return (
        value.name &&
        value.role &&
        value.desc &&
        value.quote &&
        Array.isArray(value.details) &&
        value.details.length <= 3
      )
    }
  },
  isExpanded: {
    type: Boolean,
    default: false
  },
  texture: {
    type: String,
    default: 'swiss-dots',
    validator: (value) => ['swiss-dots', 'swiss-diagonal', 'swiss-grid-pattern'].includes(value)
  }
})

const emit = defineEmits(['click'])

const textureClass = computed(() => props.texture)

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
/* ============================================
   ENTITY CARD - UNIFIED SWISS STYLE
   ============================================ */

.entity-card {
  background: var(--swiss-white);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;

  /* 克制感：快速、精准的动画 */
  transition: background-color 0.15s ease-out,
              border-color 0.15s ease-out,
              color 0.15s ease-out;
}

/* Hover State - Only when not expanded */
.entity-card:hover:not(.expanded) {
  background-color: var(--swiss-accent);
  border-color: var(--swiss-accent);
}

.entity-card:hover:not(.expanded) * {
  color: var(--swiss-white);
}

/* Expanded State */
.entity-card.expanded {
  background-color: var(--swiss-muted);
  cursor: default;
}

/* Entity Number */
.entity-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.875rem;
  letter-spacing: 0.15em;
  color: var(--swiss-accent);
}

/* Entity Info */
.entity-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.entity-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--swiss-black);
  margin: 0;
}

.entity-role {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--swiss-text-secondary);
  margin: 0;
}

.entity-desc {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  color: var(--swiss-text-secondary);
  margin: 0;
}

/* Entity Quote */
.entity-quote {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--swiss-black);
  padding: 1rem;
  border-left: 2px solid var(--swiss-accent);
}

/* Entity Details */
.entity-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--swiss-border);
}

.detail-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-label {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--swiss-accent);
  margin: 0;
}

.detail-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--swiss-black);
  margin: 0;
}

/* Expanded state - dark text for readability */
.entity-card.expanded .detail-text {
  color: var(--swiss-black);
}

/* Responsive */
@media (max-width: 768px) {
  .entity-card {
    padding: 1.5rem;
  }

  .entity-name {
    font-size: 1rem;
  }

  .entity-quote {
    font-size: 0.8rem;
  }
}
</style>
