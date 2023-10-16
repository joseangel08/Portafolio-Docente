<?php
class Controlador{
    public function render($view, $title='', $objects=null, $withLayout=true){
        if (is_array($objects)) {
            extract($objects, EXTR_PREFIX_SAME, 'data');
        } else {
            $data=$objects;
        }
        define('content', APP.'view/'.$view.'.php');        
        if ($withLayout) {
            require APP.'http://localhost:4200/';
        } else {
            require content;
        }
    }
}