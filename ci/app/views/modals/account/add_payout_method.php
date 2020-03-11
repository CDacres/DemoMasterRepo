<form>
  <div class="row">
    <div class="form-group col-sm-6">
      <label for="exampleInputEmail1">First Name</label>
      <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Eg: Mary">
    </div>
    <div class="form-group col-sm-6">
        <label for="exampleInputEmail1">Last Name</label>
        <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Eg: Stuart">
    </div>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Email</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Phone</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Eg: +4476565654654">
  </div>
  <div class="form-group space-top-2">
    <label for="exampleInputPassword1">Authorization Level</label>
    <div class="radio">
      <label>
        <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked="">
        <strong>All Venues Admin</strong> - All Venues Admin may modify your Company Zipcube profile, view edit the calendar and manages Members.
      </label>
    </div>
    <div class="radio">
      <label>
        <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
        <strong>Venue Admin</strong> - A Venue Admin can edit or modify only a specific venue profile.
      </label>
    </div>
    <div class="radio">
      <label>
        <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
        <strong>Calendar Admin</strong> - Calendar Admins may view and edit your calendars and hours on Zipcube. They cannot edit your profile or manage members.
      </label>
    </div>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Notifications Preference</label>
    <select class="form-control">
    <option>All Reservations</option>
    <option>Only hourly reservation</option>
    <option>Only monthly reservation</option>
  </select>
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox"> Send an email to the team member
    </label>
  </div>
</form>
