/*
 *
 */
"use strict";

goog.provide("Entry.Workspace");
goog.require("Entry.Model");

Entry.Workspace = function(options) {
    var option = options.blockMenu;
    if (option) {
        this.blockMenu = new Entry.BlockMenu(option.domId, option.align);
        this.blockMenu.workspace = this;
    }

    option = options.board;
    if (option) {
        this.board = new Entry.Board(option.domId);
        this.board.workspace = this;
    }

    option = options.vimBoard;
    if (option) {
        this.vimBoard = new Entry.Vim(option.domId);
        this.vimBoard.workspace = this;
    }

    if (this.board && this.vimBoard)
        this.vimBoard.hide();

    this.mode = Entry.Workspace.MODE_BOARD;
    this.selectedBoard = this.board;
};

Entry.Workspace.MODE_BOARD = 0;
Entry.Workspace.MODE_VIMBOARD = 1;

(function(p) {
    p.getBoard = function(){return this.board;};

    p.getBlockMenu = function(){return this.blockMenu;};

    p.getVimBoard = function(){return this.vimBoard;};

    p.getMode = function() {return this.mode;};

    p.setMode = function(mode){
        if (this.mode == mode) return;
        this.mode = mode;
        if (mode == Entry.Workspace.MODE_VIMBOARD) {
            if (this.board) this.board.hide();
            this.selectedBoard = this.vimBoard;
            this.vimBoard.show();
        } else {
            if (this.vimBoard) this.vimBoard.hide();
            this.selectedBoard = this.board;
            this.board.show();
            var changedCode = this.vimBoard.textToCode();
            this.board.code.load(changedCode);
        }
    };

    p.changeBoardCode = function(code) {
        this.selectedBoard.changeCode(code);
    };

    p.changeBlockMenuCode = function(code) {
        this.blockMenu.changeCode(code);
    };

    p.textToCode = function() {
        if (this.mode !== Entry.Workspace.MODE_VIMBOARD) return;
    };

    p.codeToText = function(code) {
        if (this.mode !== Entry.Workspace.MODE_VIMBOARD) return;
        this.vimBoard.codeToText(code);
    };


})(Entry.Workspace.prototype);