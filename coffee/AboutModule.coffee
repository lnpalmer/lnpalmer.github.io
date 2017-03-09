class AboutModule
  @fraction: 0
  @mode: 'closed'
  # Keep in mind there's no guarantee that open will be called after startOpen or close after startClose;
  # close could even be called following startOpen.
  # This is because the client can click on the navbar to switch somewhere before fully loading their current module.
  # startOpen and close are the only calls guaranteed to be made in a module's lifecycle.
  @startOpen: ->
    $("#aboutModule").show();
    $("#aboutModule").css('opacity', 0)
    @mode = 'opening'
  @startClose: ->
    @mode = 'closing'
  @open: ->
    @fraction = 1
    @mode = 'open'
  @close: ->
    $("#aboutModule").hide();
    @fraction = 0
    @mode = 'closed'
  @update: (dt) ->
    initialMode = @mode
    delta = dt * 7
    if @mode is 'opening'
      @fraction += delta
      if @fraction > 1
        @open()
    else if @mode is 'closing'
      @fraction -= delta
      if @fraction < 0
        @close()
    if initialMode is 'opening' or initialMode is 'closing'
      $("#aboutModule").css('opacity', @fraction * @fraction)
