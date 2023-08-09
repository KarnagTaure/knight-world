/*
 * Copyright (c) 2016 Samsung Electronics Co., Ltd
 *
 * Licensed under the Flora License, Version 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://floralicense.org/license/
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include <tizen.h>
#include <app.h>
#include <watch_app.h>
#include <watch_app_efl.h>
#include <system_settings.h>
#include <efl_extension.h>
#include <dlog.h>

#include "classicwatch.h"
#include "view.h"
#include "data.h"

#define IMAGE_BG "images/lux_3_bg_01.png"

static struct main_info {
	int cur_min;
	int cur_day;
	int cur_month;
	int cur_weekday;
	float cur_moonphase;
} s_info = {
	.cur_min = 0,
	.cur_day = 0,
	.cur_month = 0,
	.cur_weekday = 0,
	.cur_moonphase = 0.0f,
};

static void _set_time(int hour, int min, int sec);
static void _set_date(int day, int month, int day_of_week);
static void _set_moonphase(int day, int month, int year);
static Evas_Object *_create_parts(parts_type_e type);
static void _create_base_gui(int width, int height);

/**
 * @brief The system language changed event callback function.
 * @param[in] event_info The system event information
 * @param[in] user_data The user data passed from the add event handler function
 */
void lang_changed(app_event_info_h event_info, void* user_data)
{
	/*
	 * Takes necessary actions when language setting is changed
	 */
	char *locale = NULL;

	system_settings_get_value_string(SYSTEM_SETTINGS_KEY_LOCALE_LANGUAGE, &locale);
	if (locale == NULL)
		return;

	elm_language_set(locale);
	free(locale);

	return;
}

/**
 * @brief The region format changed event callback function.
 * @param[in] event_info The system event information
 * @param[in] user_data The user data passed from the add event handler function
 */
void region_changed(app_event_info_h event_info, void* user_data)
{
	/*
	 * Takes necessary actions when region setting is changed
	 */
}

/**
 * @brief The low battery event callback function.
 * @param[in] event_info The system event information
 * @param[in] user_data The user data passed from the add event handler function
 */
void low_battery(app_event_info_h event_info, void* user_data)
{
	/*
	 * Takes necessary actions when system is running on low battery
	 */
}

/**
 * @brief The low memory event callback function.
 * @param[in] event_info The system event information
 * @param[in] user_data The user data passed from the add event handler function
 */
void low_memory(app_event_info_h event_info, void* user_data)
{
	/*
	 * Takes necessary actions when system is running on low memory
	 */
	watch_app_exit();
}

/**
 * @brief The device orientation changed event callback function.
 * @param[in] event_info The system event information
 * @param[in] user_data The user data passed from the add event handler function
 */
void device_orientation(app_event_info_h event_info, void* user_data)
{
	/*
	 * Takes necessary actions when device orientation is changed
	 */
}

/**
 * @brief Called when the application starts.
 * @param[in] width The width of the window of idle screen that will show the watch UI
 * @param[in] height The height of the window of idle screen that will show the watch UI
 * @param[in] user_data The user data passed from the callback registration function
 */
static bool app_create(int width, int height, void* user_data)
{
	/*
	 * Hook to take necessary actions before main event loop starts
	 * Initialize UI resources and application's data
	 */

	app_event_handler_h handlers[5] = { NULL, };

	/*
	 * Register callbacks for each system event
	 */
	if (watch_app_add_event_handler(&handlers[APP_EVENT_LANGUAGE_CHANGED], APP_EVENT_LANGUAGE_CHANGED, lang_changed, NULL) != APP_ERROR_NONE)
		dlog_print(DLOG_ERROR, LOG_TAG, "watch_app_add_event_handler () is failed");

	if (watch_app_add_event_handler(&handlers[APP_EVENT_REGION_FORMAT_CHANGED], APP_EVENT_REGION_FORMAT_CHANGED, region_changed, NULL) != APP_ERROR_NONE)
		dlog_print(DLOG_ERROR, LOG_TAG, "watch_app_add_event_handler () is failed");

	if (watch_app_add_event_handler(&handlers[APP_EVENT_LOW_BATTERY], APP_EVENT_LOW_BATTERY, low_battery, NULL) != APP_ERROR_NONE)
		dlog_print(DLOG_ERROR, LOG_TAG, "watch_app_add_event_handler () is failed");

	if (watch_app_add_event_handler(&handlers[APP_EVENT_LOW_MEMORY], APP_EVENT_LOW_MEMORY, low_memory, NULL) != APP_ERROR_NONE)
		dlog_print(DLOG_ERROR, LOG_TAG, "watch_app_add_event_handler () is failed");

	if (watch_app_add_event_handler(&handlers[APP_EVENT_DEVICE_ORIENTATION_CHANGED], APP_EVENT_DEVICE_ORIENTATION_CHANGED, device_orientation, NULL) != APP_ERROR_NONE)
		dlog_print(DLOG_ERROR, LOG_TAG, "watch_app_add_event_handler () is failed");

	dlog_print(DLOG_DEBUG, LOG_TAG, "%s", __func__);

	/*
	 * Create base GUI
	 */
	_create_base_gui(width, height);

	return true;
}

/**
 * @brief Called when another application sends a launch request to the application.
 * @param[in] width The width of the window of idle screen that will show the watch UI
 * @param[in] height The height of the window of idle screen that will show the watch UI
 * @param[in] user_data The user data passed from the callback registration function
 */
static void app_control(app_control_h app_control, void *user_data)
{
	/*
	 * Handle the launch request.
	 */
}

/**
 * @brief Called when the application is completely obscured by another application and becomes invisible.
 * @param[in] user_data The user data passed from the callback registration function
 */
static void app_pause(void *user_data)
{
	/*
	 * Take necessary actions when application becomes invisible.
	 */
}

/**
 * @brief Called when the application becomes visible.
 * @param[in] user_data The user data passed from the callback registration function
 */
static void app_resume(void *user_data)
{
	/*
	 * Take necessary actions when application becomes visible.
	 */
}

/**
 * @brief Called when the application's main loop exits.
 * @param[in] user_data The user data passed from the callback registration function
 */
static void app_terminate(void *user_data)
{
	view_destroy_base_gui();
}

/**
 * @brief Called at each second. This callback is not called while the app is paused or the device is in ambient mode.
 * @param[in] watch_time The watch time handle. watch_time will not be available after returning this callback. It will be freed by the framework.
 * @param[in] user_data The user data to be passed to the callback functions
 */
void app_time_tick(watch_time_h watch_time, void* user_data)
{
	int hour = 0;
	int min = 0;
	int sec = 0;
	int year = 0;
	int month = 0;
	int day = 0;
	int day_of_week = 0;

	watch_time_get_hour(watch_time, &hour);
	watch_time_get_minute(watch_time, &min);
	watch_time_get_second(watch_time, &sec);
	watch_time_get_day(watch_time, &day);
	watch_time_get_month(watch_time, &month);
	watch_time_get_year(watch_time, &year);
	watch_time_get_day_of_week(watch_time, &day_of_week);

	_set_time(hour, min, sec);
	_set_date(day, month, day_of_week);
	_set_moonphase(day, month, year);
}

/**
 * @brief Called at each minute when the device in the ambient mode.
 * @param[in] watch_time The watch time handle. watch_time will not be available after returning this callback. It will be freed by the framework
 * @param[in] user_data The user data to be passed to the callback functions
 */
void app_ambient_tick(watch_time_h watch_time, void* user_data)
{
}

/**
 * @brief Called when the device enters or exits the ambient mode.
 * @param[in] ambient_mode If @c true the device enters the ambient mode, otherwise @c false
 * @param[in] user_data The user data to be passed to the callback functions
 */
void app_ambient_changed(bool ambient_mode, void* user_data)
{
	if (ambient_mode) {
		/*
		 * Prepare to enter the ambient mode
		 */
	} else {
		/*
		 * Prepare to exit the ambient mode
		 */
	}
}

/**
 * @brief Main function of the application.
 */
int main(int argc, char *argv[])
{
	int ret = 0;

	watch_app_lifecycle_callback_s event_callback = { 0, };

	event_callback.create = app_create;
	event_callback.terminate = app_terminate;
	event_callback.pause = app_pause;
	event_callback.resume = app_resume;
	event_callback.app_control = app_control;
	event_callback.time_tick = app_time_tick;
	event_callback.ambient_tick = app_ambient_tick;
	event_callback.ambient_changed = app_ambient_changed;

	ret = watch_app_main(argc, argv, &event_callback, NULL);
	if (ret != APP_ERROR_NONE)
		dlog_print(DLOG_ERROR, LOG_TAG, "watch_app_main() is failed. err = %d", ret);

	return ret;
}

/**
 * @brief Set time at the watch.
 * @pram[in] hour The hour number
 * @pram[in] min The min number
 * @pram[in] sec The sec number
 */
static void _set_time(int hour, int min, int sec)
{
	Evas_Object *bg = NULL;
	Evas_Object *hands = NULL;
	Evas_Object *hands_shadow = NULL;
	double degree = 0.0f;

	bg = view_get_bg();
	if (bg == NULL) {
		dlog_print(DLOG_ERROR, LOG_TAG, "Failed to get bg");
		return;
	}

	/*
	 * Rotate hands at the watch
	 */
	degree = sec * SEC_ANGLE;
	hands = evas_object_data_get(bg, "__HANDS_SEC__");
	view_rotate_hand(hands, degree, (BASE_WIDTH / 2), (BASE_HEIGHT / 2));
	hands_shadow = evas_object_data_get(bg, "__HANDS_SEC_SHADOW__");
	view_rotate_hand(hands_shadow, degree, (BASE_WIDTH / 2), (BASE_HEIGHT / 2) + HANDS_SEC_SHADOW_PADDING);

	if (s_info.cur_min != min) {
		degree = min * MIN_ANGLE;
		hands = evas_object_data_get(bg, "__HANDS_MIN__");
		view_rotate_hand(hands, degree, (BASE_WIDTH / 2), (BASE_HEIGHT / 2));
		hands_shadow = evas_object_data_get(bg, "__HANDS_MIN_SHADOW__");
		view_rotate_hand(hands_shadow, degree, (BASE_WIDTH / 2), (BASE_HEIGHT / 2) + HANDS_MIN_SHADOW_PADDING);
		s_info.cur_min = min;

		degree = (hour * HOUR_ANGLE) + data_get_plus_angle(min);
		hands = evas_object_data_get(bg, "__HANDS_HOUR__");
		view_rotate_hand(hands, degree, (BASE_WIDTH / 2), (BASE_HEIGHT / 2));
		hands_shadow = evas_object_data_get(bg, "__HANDS_HOUR_SHADOW__");
		view_rotate_hand(hands_shadow, degree, (BASE_WIDTH / 2), (BASE_HEIGHT / 2) + HANDS_HOUR_SHADOW_PADDING);
	}
}

/**
 * @brief Set date at the watch.
 * @pram[in] day The day number
 * @pram[in] month The month number
 * @pram[in] day_of_week The day of week number
 */
static void _set_date(int day, int month, int day_of_week)
{
	Evas_Object *bg = NULL;
	Evas_Object *module_day_layout = NULL;
	Evas_Object *hands = NULL;
	Evas_Object *hands_shadow = NULL;
	double degree = 0.0f;
	char txt_day_num[32] = { 0, };

	/*
	 * Set day at the watch
	 */
	if (s_info.cur_day != day) {
		module_day_layout = view_get_module_day_layout();
		snprintf(txt_day_num, sizeof(txt_day_num), "%d", day);
		view_set_text(module_day_layout, "txt.day.num", txt_day_num);
		s_info.cur_day = day;
	}

	bg = view_get_bg();
	if (bg == NULL) {
		dlog_print(DLOG_ERROR, LOG_TAG, "Failed to get bg");
		return;
	}

	/*
	 * Rotate hands at the watch
	 */
	if (s_info.cur_month != month) {
		degree = month * MONTH_ANGLE;
		hands = evas_object_data_get(bg, "__HANDS_MODULE_MONTH__");
		view_rotate_hand(hands, degree, (BASE_WIDTH / 2) - (HANDS_MODULE_CALENDAR_WIDTH / 2) - 54, 175 + (HANDS_MODULE_CALENDAR_HEIGHT / 2));
		hands_shadow = evas_object_data_get(bg, "__HANDS_MODULE_MONTH_SHADOW__");
		view_rotate_hand(hands_shadow, degree, (BASE_WIDTH / 2) - (HANDS_MODULE_CALENDAR_WIDTH / 2) - 54, 175 + (HANDS_MODULE_CALENDAR_HEIGHT / 2) + HANDS_MODULE_CALENDAR_PADDING);
		s_info.cur_month = month;
	}

	if (s_info.cur_weekday != day_of_week) {
		degree = (day_of_week - 1) * WEEKDAY_ANGLE;
		hands = evas_object_data_get(bg, "__HANDS_MODULE_WEEKDAY__");
		view_rotate_hand(hands, degree, (BASE_WIDTH / 2) + (HANDS_MODULE_CALENDAR_WIDTH / 2) + 54, 175 + (HANDS_MODULE_CALENDAR_HEIGHT / 2));
		hands_shadow = evas_object_data_get(bg, "__HANDS_MODULE_WEEKDAY_SHADOW__");
		view_rotate_hand(hands_shadow, degree, (BASE_WIDTH / 2) + (HANDS_MODULE_CALENDAR_WIDTH / 2) + 54, 175 + (HANDS_MODULE_CALENDAR_HEIGHT / 2) + HANDS_MODULE_CALENDAR_PADDING);
		s_info.cur_weekday = day_of_week;
	}
}

/**
 * @brief Set moon phase at the watch.
 * @pram[in] day The day number
 * @pram[in] month The month number
 * @pram[in] year The year number
 */
static void _set_moonphase(int day, int month, int year)
{
	float angle = 0.0f;

	angle = data_get_moonphase(day, month, year);
	if (s_info.cur_moonphase == angle) {
		return;
	}
	s_info.cur_moonphase = angle;

	dlog_print(DLOG_INFO, LOG_TAG, "Moon phase degree : %.2f", angle);

	view_rotate_moonphase(angle);
}

/**
 * @brief Create parts of watch.
 * @param[in] type Parts type
 */
static Evas_Object *_create_parts(parts_type_e type)
{
	Evas_Object *parts = NULL;
	Evas_Object *bg = NULL;
	char *parts_image_path = NULL;
	int x = 0, y = 0, w = 0, h = 0;

	/*
	 * Get the BG
	 */
	bg = view_get_bg();

	/*
	 * Get the information about the part
	 */
	parts_image_path = data_get_parts_image_path(type);
	data_get_parts_position(type, &x, &y);
	w = data_get_parts_width_size(type);
	h = data_get_parts_height_size(type);

	/*
	 * Create the part object
	 */
	parts = view_create_parts(bg, parts_image_path, x, y, w, h);
	if (parts == NULL) {
		dlog_print(DLOG_ERROR, LOG_TAG, "Failed to create parts : %d", type);
	}

	free(parts_image_path);

	/*
	 * Set opacity to shadow hands
	 */
	if (type == PARTS_TYPE_HANDS_HOUR_SHADOW ||
			type == PARTS_TYPE_HANDS_MIN_SHADOW ||
			type == PARTS_TYPE_HANDS_SEC_SHADOW) {
		view_set_opacity_to_parts(parts);
	}

	return parts;
}

/**
 * @brief Create base GUI for the watch.
 * @param[in] width The width size of the watch
 * @param[in] height The height size of the watch
 */
static void _create_base_gui(int width, int height)
{
	Evas_Object *win = NULL;
	Evas_Object *bg = NULL;
	Evas_Object *module_moonphase_layout = NULL;
	Evas_Object *module_day_layout = NULL;
	Evas_Object *module_month_layout = NULL;
	Evas_Object *module_weekday_layout = NULL;
	Evas_Object *hands_sec = NULL;
	Evas_Object *hands_min = NULL;
	Evas_Object *hands_hour = NULL;
	Evas_Object *hands_module_month = NULL;
	Evas_Object *hands_module_weekday = NULL;
	Evas_Object *hands_sec_shadow = NULL;
	Evas_Object *hands_min_shadow = NULL;
	Evas_Object *hands_hour_shadow = NULL;
	Evas_Object *hands_module_month_shadow = NULL;
	Evas_Object *hands_module_weekday_shadow = NULL;
	char bg_path[PATH_MAX] = { 0, };
	char edj_path[PATH_MAX] = { 0, };
	int ret = 0;

	/*
	 * Get window object
	 */
	ret = watch_app_get_elm_win(&win);
	if (ret != APP_ERROR_NONE) {
		dlog_print(DLOG_ERROR, LOG_TAG, "failed to get window. err = %d", ret);
		return;
	}
	evas_object_resize(win, width, height);
	evas_object_show(win);

	/*
	 * Get background image file path
	 */
	data_get_resource_path(IMAGE_BG, bg_path, sizeof(bg_path));

	/*
	 * Create BG
	 */
	bg = view_create_bg(win, bg_path, width, height);
	if (bg == NULL) {
		dlog_print(DLOG_ERROR, LOG_TAG, "Failed to create a bg");
		return;
	}

	/*
	 * Get edje file path
	 */
	data_get_resource_path(EDJ_FILE, edj_path, sizeof(edj_path));

	/*
	 * Create layout to display moon phase at the watch
	 */
	module_moonphase_layout = view_create_module_layout(bg, edj_path, "layout_module_moonphase");
	if (module_moonphase_layout) {
		view_set_module_property(module_moonphase_layout, 60, 60, MODULE_MOONPHASE_SIZE, MODULE_MOONPHASE_SIZE);
		view_set_module_moonphase_layout(module_moonphase_layout);
	}

	/*
	 * Create layout to display day number at the watch
	 */
	module_day_layout = view_create_module_layout(bg, edj_path, "layout_module_day");
	if (module_day_layout) {
		view_set_module_property(module_day_layout, BASE_WIDTH - MODULE_DAY_NUM_SIZE - MODULE_DAY_NUM_RIGHT_PADDING, (BASE_HEIGHT / 2) - (MODULE_DAY_NUM_SIZE / 2), MODULE_DAY_NUM_SIZE, MODULE_DAY_NUM_SIZE);
		view_set_module_day_layout(module_day_layout);
	}

	/*
	 * Create layout to display calendar module(month)
	 */
	module_month_layout = view_create_module_layout(bg, edj_path, "layout_module_month");
	if (module_month_layout) {
		view_set_module_property(module_month_layout, 52, 175, MODULE_MONTH_SIZE, MODULE_MONTH_SIZE);
		view_set_module_month_layout(module_month_layout);
	}

	/*
	 * Create layout to display calendar module(day)
	 */
	module_weekday_layout = view_create_module_layout(bg, edj_path, "layout_module_weekday");
	if (module_weekday_layout) {
		view_set_module_property(module_weekday_layout, 52 + MODULE_MONTH_SIZE, 175, MODULE_WEEKDAY_SIZE, MODULE_WEEKDAY_SIZE);
		view_set_module_weekday_layout(module_weekday_layout);
	}

	/*
	 * Create hands & shadow hands to display at the watch
	 */
	hands_module_month_shadow = _create_parts(PARTS_TYPE_HANDS_MODULE_MONTH_SHADOW);
	evas_object_data_set(bg, "__HANDS_MODULE_MONTH_SHADOW__", hands_module_month_shadow);
	hands_module_month = _create_parts(PARTS_TYPE_HANDS_MODULE_MONTH);
	evas_object_data_set(bg, "__HANDS_MODULE_MONTH__", hands_module_month);

	hands_module_weekday_shadow = _create_parts(PARTS_TYPE_HANDS_MODULE_WEEKDAY_SHADOW);
	evas_object_data_set(bg, "__HANDS_MODULE_WEEKDAY_SHADOW__", hands_module_weekday_shadow);
	hands_module_weekday = _create_parts(PARTS_TYPE_HANDS_MODULE_WEEKDAY);
	evas_object_data_set(bg, "__HANDS_MODULE_WEEKDAY__", hands_module_weekday);

	hands_sec_shadow = _create_parts(PARTS_TYPE_HANDS_SEC_SHADOW);
	evas_object_data_set(bg, "__HANDS_SEC_SHADOW__", hands_sec_shadow);
	hands_sec = _create_parts(PARTS_TYPE_HANDS_SEC);
	evas_object_data_set(bg, "__HANDS_SEC__", hands_sec);

	hands_min_shadow = _create_parts(PARTS_TYPE_HANDS_MIN_SHADOW);
	evas_object_data_set(bg, "__HANDS_MIN_SHADOW__", hands_min_shadow);
	hands_min = _create_parts(PARTS_TYPE_HANDS_MIN);
	evas_object_data_set(bg, "__HANDS_MIN__", hands_min);

	hands_hour_shadow = _create_parts(PARTS_TYPE_HANDS_HOUR_SHADOW);
	evas_object_data_set(bg, "__HANDS_HOUR_SHADOW__", hands_hour_shadow);
	hands_hour = _create_parts(PARTS_TYPE_HANDS_HOUR);
	evas_object_data_set(bg, "__HANDS_HOUR__", hands_hour);
}
