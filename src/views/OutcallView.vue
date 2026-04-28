<template>
  <main class="page-shell">

    <!-- HERO -->
    <section class="tech-panel hero text-center">
      <p class="tech-eyebrow">Mobile repair</p>
      <h2>We Come to You</h2>
      <p class="tech-muted">
        Home, uni, or work. Fast, same-day iPhone repairs without leaving your location.
      </p>
    </section>

    <!-- WHAT IT IS -->
    <section class="tech-panel content-section">
      <p class="tech-eyebrow">Outcall service</p>
      <h2>On-Site Repairs</h2>
      <p class="tech-muted">
        We travel to your location and complete the repair on the spot.
        Perfect if you don’t have time to visit or need a quick fix during your day.
      </p>
    </section>

    <!-- WHAT CAN BE DONE -->
    <section class="tech-panel content-section">
      <p class="tech-eyebrow">Available repairs</p>
      <h2>What Can Be Done On-Site</h2>

      <div class="flex flex-col gap-2 mt-4 text-left">
        <p class="tech-muted">✅ Battery replacements</p>
        <p class="tech-muted">✅ Screen repairs (selected models)</p>
        <p class="tech-muted">✅ Basic diagnostics</p>
        <p class="tech-muted">⚠️ Some newer models may require workshop tools</p>
      </div>

      <p class="tech-soft text-sm mt-3">
        We’ll confirm repair suitability before coming out.
      </p>
    </section>

    <!-- TRAVEL -->
    <section class="tech-panel content-section">
      <p class="tech-eyebrow">Travel</p>
      <h2>Call-Out Area</h2>

      <p class="tech-muted">
        Based in Clayton. We cover nearby suburbs including Monash, Oakleigh, and surrounding areas.
      </p>

      <p class="tech-soft text-sm mt-2">
        • Free within local area<br>
        • Small travel fee may apply further out<br>
        • Often waived when combined with repair
      </p>
    </section>

    <!-- EXPECT -->
    <section class="tech-panel content-section expect">
      <p class="tech-eyebrow">Timing</p>
      <h2>What to Expect</h2>

      <p class="tech-muted"><strong>Arrival:</strong> Same-day or scheduled</p>
      <p class="tech-muted"><strong>Repair time:</strong> 20–45 minutes</p>
      <p class="tech-muted">
        If specialised tools are required, we can arrange pickup and return.
      </p>
    </section>

    <!-- CTA -->
    <section class="tech-panel cta">
      <p class="tech-eyebrow">Book an outcall</p>
      <h2>Ready to Book a Visit?</h2>

      <div class="cta-actions">
        <RouterLink to="/calculator" class="tech-button btn">
          Get Quote
        </RouterLink>

        <RouterLink to="/contact" class="tech-button secondary btn">
          Message Now
        </RouterLink>
      </div>
    </section>

  </main>
</template>

<script setup>
// no logic needed yet
</script>

<style scoped>
.page-shell {
  padding: 20px;
}

.hero {
  padding: 28px 24px;
}

h2 {
  margin-top: 4px;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.content-section {
  margin-top: 20px;
  padding: 24px;
  text-align: center;
}

.expect {
  text-align: left;
}

/* CTA */
.cta {
  margin-top: 20px;
  text-align: center;
  padding: 40px 24px;
}

.cta-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  margin-top: 20px;
}

.btn {
  padding: 12px 20px;
}

@media (min-width: 640px) {
  .cta-actions {
    flex-direction: row;
  }
}
</style>
